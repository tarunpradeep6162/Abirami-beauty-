import { readdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
for(const file of await readdir('src'))if(file.endsWith('.mjs'))execFileSync(process.execPath,['--check',`src/${file}`],{stdio:'inherit'});
