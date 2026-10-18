import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import pg from 'pg';
import { readFile } from 'node:fs/promises';
test('concurrent overlapping reservations: one succeeds, adjacent slot succeeds',{skip:!process.env.TEST_DATABASE_URL},async()=>{
 const pool=new pg.Pool({connectionString:process.env.TEST_DATABASE_URL});
 try{await pool.query(await readFile(new URL('../sql/001.sql',import.meta.url),'utf8'));const resource=`test-${randomUUID()}`;
 const insert=(start,end)=>pool.query('INSERT INTO bookings(id,request_key,request_hash,client_name,treatment,resource,starts_at,ends_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8)',[randomUUID(),randomUUID(),'test','Test Client','facial',resource,start,end]);
 try{const results=await Promise.allSettled([insert('2030-01-01T10:00Z','2030-01-01T11:00Z'),insert('2030-01-01T10:30Z','2030-01-01T11:30Z')]);assert.equal(results.filter(r=>r.status==='fulfilled').length,1);const rejected=results.find(r=>r.status==='rejected');assert.equal(rejected.reason.code,'23P01');const adjacent=results[0].status==='fulfilled'?'2030-01-01T11:00Z':'2030-01-01T11:30Z';await insert(adjacent,'2030-01-01T12:30Z');}finally{await pool.query('DELETE FROM bookings WHERE resource=$1',[resource]);}
 }finally{await pool.end();}
});
