use wasm_bindgen::prelude::*;

fn hash(x: u32, y: u32, seed: u32) -> f64 {
    let mut value = x.wrapping_mul(374_761_393) ^ y.wrapping_mul(668_265_263) ^ seed;
    value = (value ^ (value >> 13)).wrapping_mul(1_274_126_177);
    f64::from(value ^ (value >> 16)) / f64::from(u32::MAX)
}

fn smooth(value: f64) -> f64 { value * value * (3.0 - 2.0 * value) }
fn mix(a: f64, b: f64, amount: f64) -> f64 { a + (b - a) * amount }

fn periodic_noise(x: f64, y: f64, cells: u32, seed: u32) -> f64 {
    let ix = x.floor() as u32;
    let iy = y.floor() as u32;
    let tx = smooth(x.fract());
    let ty = smooth(y.fract());
    let a = hash(ix % cells, iy % cells, seed);
    let b = hash((ix + 1) % cells, iy % cells, seed);
    let c = hash(ix % cells, (iy + 1) % cells, seed);
    let d = hash((ix + 1) % cells, (iy + 1) % cells, seed);
    mix(mix(a, b, tx), mix(c, d, tx), ty)
}

fn generate(size: u32, seed: u32) -> Vec<u8> {
    let mut pixels = vec![0; (size * size * 4) as usize];
    for y in 0..size {
        for x in 0..size {
            let mut value = 0.0;
            for (cells, weight) in [(4, 0.57), (8, 0.29), (16, 0.14)] {
                value += periodic_noise(f64::from(x) / f64::from(size) * f64::from(cells), f64::from(y) / f64::from(size) * f64::from(cells), cells, seed) * weight;
            }
            let shade = (value * 255.0).round().clamp(0.0, 255.0) as u8;
            let offset = ((y * size + x) * 4) as usize;
            pixels[offset..offset + 4].copy_from_slice(&[shade, shade, shade, 255]);
        }
    }
    pixels
}

#[wasm_bindgen]
pub fn flow_field(size: u32, seed: u32) -> Result<Vec<u8>, JsValue> {
    if !(2..=1024).contains(&size) { return Err(JsValue::from_str("size must be between 2 and 1024")); }
    Ok(generate(size, seed))
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn field_is_repeatable_and_seeded() {
        let first = generate(32, 47);
        assert_eq!(first.len(), 32 * 32 * 4);
        assert_eq!(first, generate(32, 47));
        assert_ne!(first, generate(32, 48));
        assert!(first.chunks_exact(4).all(|pixel| pixel[0] == pixel[1] && pixel[1] == pixel[2] && pixel[3] == 255));
    }
}
