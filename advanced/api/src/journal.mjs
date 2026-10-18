import { readFile } from 'node:fs/promises';
import { z } from 'zod';
import { pool } from './db.mjs';
const id=z.uuid().parse(process.argv[2]);
const journal=z.object({notes:z.string().max(12000),timeline:z.array(z.object({time:z.string().min(1).max(40),detail:z.string().min(1).max(400)}).strict()).max(40)}).strict().parse(JSON.parse(await readFile(process.argv[3],'utf8')));
try{const result=await pool.query('UPDATE brides SET notes=$2,timeline=$3 WHERE id=$1',[id,journal.notes,JSON.stringify(journal.timeline)]);if(!result.rowCount)throw new Error('Bride not found');console.log('Private journal updated.');}finally{await pool.end();}
