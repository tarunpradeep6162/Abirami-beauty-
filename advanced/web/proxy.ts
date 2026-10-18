import { NextRequest, NextResponse } from 'next/server';
export function proxy(request:NextRequest){
 const nonce=btoa(crypto.randomUUID());
 const development=process.env.NODE_ENV==='development';
 const policy=["default-src 'self'",`script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${development?" 'unsafe-eval'":''}`,`style-src 'self' 'nonce-${nonce}'`,"style-src-attr 'unsafe-inline'","img-src 'self' data: blob:","font-src 'self'","connect-src 'self'"+(development?' ws:':''),"object-src 'none'","base-uri 'self'","frame-ancestors 'none'","form-action 'self' https://checkout.stripe.com"].join('; ');
 const headers=new Headers(request.headers);headers.set('x-nonce',nonce);headers.set('Content-Security-Policy',policy);
 const response=NextResponse.next({request:{headers}});response.headers.set('Content-Security-Policy',policy);response.headers.set('Cache-Control','private, no-store');
 if(!development)response.headers.set('Strict-Transport-Security','max-age=63072000; includeSubDomains');
 return response;
}
export const config={matcher:['/((?!api|_next/static|_next/image|assets|favicon.ico).*)']};
