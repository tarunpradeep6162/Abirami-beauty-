import { test } from 'node:test';
import assert from 'node:assert/strict';
import { appointment,bookingInput,sessionOutcome } from '../src/rules.mjs';
const now=Date.parse('2026-10-19T00:00:00Z');
test('full bridal duration must fit before weekday closing',()=>{
 assert.doesNotThrow(()=>appointment({treatment:'bridal',startsAt:'2026-10-20T17:00:00+05:30'},now));
 assert.throws(()=>appointment({treatment:'bridal',startsAt:'2026-10-20T17:15:00+05:30'},now));
});
test('Sunday closes at 16:30, accepts any treatment that fits',()=>{
 assert.doesNotThrow(()=>appointment({treatment:'facial',startsAt:'2026-10-25T15:30:00+05:30'},now));
 assert.throws(()=>appointment({treatment:'facial',startsAt:'2026-10-25T15:45:00+05:30'},now));
});
test('rejects past, overnight, off-grid and excessively distant slots',()=>{
 for(const startsAt of ['2026-10-18T11:00:00+05:30','2026-10-20T23:00:00+05:30','2026-10-20T11:07:00+05:30','2027-10-20T11:00:00+05:30'])assert.throws(()=>appointment({treatment:'hair',startsAt},now));
});
test('cannot submit amount overrides, unknown treatment or controls',()=>{
 for(const input of [{name:'Client',treatment:'bridal',startsAt:'2026-10-20T11:00:00Z',amount:1},{name:'Client',treatment:'other',startsAt:'2026-10-20T11:00:00Z'},{name:'A\u0000B',treatment:'bridal',startsAt:'2026-10-20T11:00:00Z'}])assert.equal(bookingInput.safeParse(input).success,false);
});
test('only verified complete paid sessions confirm, not redirects',()=>{
 assert.equal(sessionOutcome({payment_status:'unpaid',status:'complete'}),null);
 assert.equal(sessionOutcome({payment_status:'paid',status:'complete'}),'confirmed');
 assert.equal(sessionOutcome({payment_status:'unpaid',status:'expired'}),'expired');
});
