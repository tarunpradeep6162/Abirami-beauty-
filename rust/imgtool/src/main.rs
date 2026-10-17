use anyhow::{ensure, Context, Result};
use base64::{engine::general_purpose::STANDARD, Engine};
use image::{codecs::avif::AvifEncoder, codecs::webp::WebPEncoder, imageops::FilterType,
    DynamicImage, ImageDecoder, ImageEncoder, ImageReader, RgbaImage};
use serde::Serialize;
use sha2::{Digest, Sha256};
use std::{collections::BTreeMap, env, fs, io::{BufWriter, Write}, path::{Path, PathBuf}};

const WIDTHS: [u32; 3] = [480, 960, 1600];

#[derive(Serialize)]
struct Variant { width: u32, height: u32, avif: String, webp: String }

#[derive(Serialize)]
struct Photo {
    width: u32,
    height: u32,
    dominant: String,
    placeholder: String,
    variants: Vec<Variant>,
}

#[derive(Serialize)]
struct Manifest { version: u32, images: BTreeMap<String, Photo> }

fn dominant_color(image: &DynamicImage) -> String {
    let sample = image.thumbnail(64, 64).to_rgba8();
    let mut bins = vec![[0u64; 4]; 4096];
    for pixel in sample.pixels() {
        let [r, g, b, alpha] = pixel.0;
        let slot = ((r as usize >> 4) << 8) | ((g as usize >> 4) << 4) | (b as usize >> 4);
        let weight = alpha as u64;
        bins[slot][0] += weight;
        bins[slot][1] += r as u64 * weight;
        bins[slot][2] += g as u64 * weight;
        bins[slot][3] += b as u64 * weight;
    }
    let best = bins.iter().max_by_key(|bin| bin[0]).unwrap();
    if best[0] == 0 { return "#d5c8b9".into(); }
    format!("#{:02x}{:02x}{:02x}", best[1] / best[0], best[2] / best[0], best[3] / best[0])
}

fn write_webp(path: &Path, pixels: &RgbaImage) -> Result<()> {
    let mut file = BufWriter::new(fs::File::create(path)?);
    WebPEncoder::new_lossless(&mut file).write_image(pixels.as_raw(), pixels.width(), pixels.height(), image::ExtendedColorType::Rgba8)?;
    file.flush()?;
    Ok(())
}

fn process(path: &Path, output: &Path, name: &str) -> Result<Photo> {
    ensure!(fs::metadata(path)?.len() <= 80 * 1024 * 1024, "source exceeds 80 MiB");
    let mut decoder = ImageReader::open(path)?.with_guessed_format()?.into_decoder()?;
    let (width, height) = decoder.dimensions();
    ensure!(width > 0 && height > 0 && u64::from(width) * u64::from(height) <= 40_000_000, "image exceeds 40 megapixels or has invalid dimensions");
    ensure!(width.max(height) <= width.min(height).saturating_mul(10), "aspect ratio exceeds 10:1");
    let orientation = decoder.orientation()?;
    let mut image = DynamicImage::from_decoder(decoder)?;
    image.apply_orientation(orientation);
    let digest = format!("{:x}", Sha256::digest(fs::read(path)?));
    let prefix = format!("{name}-{}", &digest[..16]);
    let mut variants = Vec::new();
    for width in WIDTHS {
        let height = ((u64::from(image.height()) * u64::from(width) + u64::from(image.width()) / 2) / u64::from(image.width())).max(1) as u32;
        let resized = image.resize_exact(width, height, FilterType::Lanczos3).to_rgba8();
        let avif = format!("{prefix}-{width}.avif");
        let webp = format!("{prefix}-{width}.webp");
        let mut file = BufWriter::new(fs::File::create(output.join(&avif))?);
        AvifEncoder::new_with_speed_quality(&mut file, 6, 65)
            .write_image(resized.as_raw(), width, height, image::ExtendedColorType::Rgba8)?;
        file.flush()?;
        write_webp(&output.join(&webp), &resized)?;
        variants.push(Variant { width, height, avif: format!("/assets/img/generated/{avif}"), webp: format!("/assets/img/generated/{webp}") });
    }
    let tiny = image.resize(24, 24, FilterType::Triangle).blur(1.2).to_rgba8();
    let mut placeholder = Vec::new();
    WebPEncoder::new_lossless(&mut placeholder).write_image(tiny.as_raw(), tiny.width(), tiny.height(), image::ExtendedColorType::Rgba8)?;
    let tiny_name = format!("{prefix}-blur.webp");
    fs::write(output.join(tiny_name), &placeholder)?;
    Ok(Photo {
        width: image.width(), height: image.height(), dominant: dominant_color(&image),
        placeholder: format!("data:image/webp;base64,{}", STANDARD.encode(placeholder)), variants,
    })
}

fn run() -> Result<()> {
    let args: Vec<String> = env::args().skip(1).collect();
    if args.first().is_some_and(|arg| arg == "--help") {
        println!("Usage: abirami-imgtool [photos-original] [public/assets/img]\nReads top-level JPG, JPEG, PNG and WebP files. Filenames use lowercase letters, digits and hyphens.");
        return Ok(());
    }
    ensure!(args.len() <= 2, "expected at most input and output directories");
    let input = PathBuf::from(args.first().map(String::as_str).unwrap_or("photos-original"));
    let output = PathBuf::from(args.get(1).map(String::as_str).unwrap_or("public/assets/img"));
    let mut paths: Vec<PathBuf> = fs::read_dir(&input).with_context(|| format!("read {}", input.display()))?
        .map(|entry| entry.map(|item| item.path())).collect::<std::io::Result<_>>()?;
    paths.sort();
    let mut sources = BTreeMap::new();
    for path in paths {
        if !path.is_file() { continue; }
        let ext = path.extension().and_then(|part| part.to_str()).unwrap_or("").to_ascii_lowercase();
        if !matches!(ext.as_str(), "jpg" | "jpeg" | "png" | "webp") { continue; }
        let name = path.file_stem().and_then(|part| part.to_str()).context("filename is not UTF-8")?.to_owned();
        ensure!(!name.is_empty() && name.bytes().all(|c| c.is_ascii_lowercase() || c.is_ascii_digit() || c == b'-'), "use a lowercase filename such as hero.jpg: {}", path.display());
        ensure!(sources.insert(name.clone(), path).is_none(), "duplicate image name: {name}");
    }
    let generated = output.join("generated");
    fs::create_dir_all(&generated)?;
    let mut manifest = Manifest { version: 1, images: BTreeMap::new() };
    for (name, path) in sources {
        let photo = process(&path, &generated, &name).with_context(|| format!("convert {}", path.display()))?;
        manifest.images.insert(name, photo);
    }
    // Publish the manifest only after every image has been encoded.
    let temporary = output.join("manifest.json.tmp");
    fs::write(&temporary, serde_json::to_vec_pretty(&manifest)?)?;
    let target = output.join("manifest.json");
    // Windows cannot rename over an existing file.
    if target.exists() && cfg!(windows) { fs::remove_file(&target)?; }
    fs::rename(temporary, target)?;
    println!("Images: {} originals, widths 480/960/1600, AVIF + WebP.", manifest.images.len());
    Ok(())
}

fn main() {
    if let Err(error) = run() { eprintln!("imgtool: {error:#}"); std::process::exit(1); }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn transparent_pixels_do_not_dominate() {
        let mut pixels = RgbaImage::from_pixel(8, 8, image::Rgba([255, 0, 0, 0]));
        pixels.put_pixel(0, 0, image::Rgba([32, 64, 48, 255]));
        assert_eq!(dominant_color(&DynamicImage::ImageRgba8(pixels)), "#204030");
    }
}
