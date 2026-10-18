import { z } from 'zod';
export const treatments=Object.freeze({bridal:{name:'Bridal Couture',minutes:210},facial:{name:'Botanical Facial',minutes:60},hair:{name:'Hair & Scalp Ritual',minutes:75},grooming:{name:'Precision Grooming',minutes:45}});
export const bookingInput=z.object({name:z.string().trim().min(2).max(80).regex(/^[^\p{Cc}\p{Cf}]+$/u),treatment:z.enum(['bridal','facial','hair','grooming']),startsAt:z.iso.datetime({offset:true})}).strict();
export function appointment(input,now=Date.now()){
 const starts=new Date(input.startsAt);const ends=new Date(starts.getTime()+treatments[input.treatment].minutes*60000);
 if(starts.getTime()<now+60*60000 || starts.getTime()>now+180*86400000)throw Object.assign(new Error('Choose a time at least one hour ahead and within 180 days.'),{status:422});
 const local=new Date(starts.getTime()+330*60000);const localEnd=new Date(ends.getTime()+330*60000);
 const minutes=local.getUTCHours()*60+local.getUTCMinutes();const endMinutes=localEnd.getUTCHours()*60+localEnd.getUTCMinutes();
 const close=local.getUTCDay()===0?990:1230;
 if(minutes<600 || endMinutes>close || local.toISOString().slice(0,10)!==localEnd.toISOString().slice(0,10) || minutes%15!==0 || starts.getUTCSeconds()!==0 || starts.getUTCMilliseconds()!==0)throw Object.assign(new Error('Choose a 15-minute start within salon hours, with enough time for the full treatment. Sunday closes at 4:30 PM.'),{status:422});
 return {starts,ends};
}
export const sessionOutcome=session=>session.payment_status==='paid' && session.status==='complete'?'confirmed':session.status==='expired'?'expired':null;
