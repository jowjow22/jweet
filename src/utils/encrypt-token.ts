import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { env } from './env'
 
const secretKey = env.NEXTAUTH_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
 
export async function encrypt(payload: {id: string}) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(encodedKey)
}
 
export async function decrypt(session: string | undefined = '') {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })

    if (!payload) {
      throw new Error('Invalid session')
    }

    return payload
}