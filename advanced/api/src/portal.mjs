import { randomBytes,randomUUID } from 'node:crypto';
import { mkdir,writeFile,unlink } from 'node:fs/promises';
import { resolve } from 'node:path';
import multer from 'multer';
import sharp from 'sharp';
import { z } from 'zod';
import { config } from './config.mjs';
import { pool,transaction } from './db.mjs';
import { digest,cookieOptions } from './security.mjs';
export const upload=multer({storage:multer.memoryStorage(),limits:{fileSize:5*1024*1024,files:1,fields:0,parts:1}}).single('image');
export async function login(req,res){
 const {token}=z.object({token:z.string().regex(/^[a-f0-9]{64}$/)}).strict().parse(req.body);
 const session=randomBytes(32).toString('hex');
 const found=await transaction(async client=>{
  const invite=await client.query('UPDATE invitations SET used_at=now() WHERE token_hash=$1 AND expires_at>now() AND used_at IS NULL RETURNING bride_id',[digest(token)]);
  if(!invite.rowCount)return false;
  await client.query("INSERT INTO portal_sessions(token_hash,bride_id,expires_at) VALUES($1,$2,now()+interval '8 hours')",[digest(session),invite.rows[0].bride_id]);return true;
 });
 if(!found)return res.status(401).json({error:'That invitation is invalid, used or expired. Ask the salon for a new one.'});
 res.cookie('abirami_session',session,cookieOptions).json({signedIn:true});
}
export async function logout(req,res){const token=(req.get('cookie')||'').split(';').map(x=>x.trim()).find(x=>x.startsWith('abirami_session='))?.slice(16);if(token)await pool.query('DELETE FROM portal_sessions WHERE token_hash=$1',[digest(token)]);res.clearCookie('abirami_session',{...cookieOptions,maxAge:undefined}).json({signedOut:true});}
export async function journal(req,res){const [bride,images]=await Promise.all([pool.query('SELECT name,notes,timeline FROM brides WHERE id=$1',[req.brideId]),pool.query('SELECT id FROM references_private WHERE bride_id=$1 ORDER BY created_at DESC',[req.brideId])]);res.json({...bride.rows[0],images:images.rows});}
export async function addImage(req,res){
 if(!req.file)return res.status(422).json({error:'Choose a JPEG, PNG or WebP image.'});
 const source=sharp(req.file.buffer,{limitInputPixels:25000000,animated:false});
 let metadata;try{metadata=await source.metadata();}catch{return res.status(422).json({error:'That file could not be read as an image.'});}
 if(!['jpeg','png','webp'].includes(metadata.format)||metadata.pages>1)return res.status(422).json({error:'Please use a still JPEG, PNG or WebP image.'});
 let bytes;try{bytes=await source.rotate().resize({width:1800,height:1800,fit:'inside',withoutEnlargement:true}).webp({quality:85}).toBuffer();}catch{return res.status(422).json({error:'That image could not be decoded. Please save a new JPEG, PNG or WebP copy.'});}
 const id=randomUUID();const file=resolve(config.PRIVATE_UPLOAD_DIR,`${id}.webp`);
 await mkdir(config.PRIVATE_UPLOAD_DIR,{recursive:true,mode:0o700});
 try{await transaction(async client=>{
  await client.query('SELECT id FROM brides WHERE id=$1 FOR UPDATE',[req.brideId]);
  const count=await client.query('SELECT count(*)::int AS count FROM references_private WHERE bride_id=$1',[req.brideId]);
  if(count.rows[0].count>=30)throw Object.assign(new Error('Your journal holds up to 30 references. Remove one before adding another.'),{status:422});
  await writeFile(file,bytes,{flag:'wx',mode:0o600});
  await client.query('INSERT INTO references_private(id,bride_id) VALUES($1,$2)',[id,req.brideId]);
 });}catch(error){await unlink(file).catch(()=>{});throw error;}
 res.status(201).json({id});
}
export async function getImage(req,res){const id=z.uuid().parse(req.params.id);const result=await pool.query('SELECT id FROM references_private WHERE id=$1 AND bride_id=$2',[id,req.brideId]);if(!result.rowCount)return res.status(404).json({error:'Reference not found.'});res.type('webp').sendFile(resolve(config.PRIVATE_UPLOAD_DIR,`${id}.webp`));}
export async function removeImage(req,res){const id=z.uuid().parse(req.params.id);const result=await pool.query('DELETE FROM references_private WHERE id=$1 AND bride_id=$2 RETURNING id',[id,req.brideId]);if(!result.rowCount)return res.status(404).json({error:'Reference not found.'});await unlink(resolve(config.PRIVATE_UPLOAD_DIR,`${id}.webp`)).catch(error=>{if(error.code!=='ENOENT')throw error;});res.json({removed:true});}
