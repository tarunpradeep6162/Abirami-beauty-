import pg from 'pg';
import { config } from './config.mjs';
export const pool=new pg.Pool({ connectionString:config.DATABASE_URL,max:10,connectionTimeoutMillis:5000,statement_timeout:10000 });
pool.on('error',()=>console.error('PostgreSQL pool connection error'));
export async function transaction(work){const client=await pool.connect();try{await client.query('BEGIN');const result=await work(client);await client.query('COMMIT');return result;}catch(error){await client.query('ROLLBACK');throw error;}finally{client.release();}}
