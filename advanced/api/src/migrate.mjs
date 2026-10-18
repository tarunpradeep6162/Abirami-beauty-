import { readFile } from 'node:fs/promises';
import { pool } from './db.mjs';
try{await pool.query(await readFile(new URL('../sql/001.sql',import.meta.url),'utf8'));console.log('Database schema ready.');}finally{await pool.end();}
