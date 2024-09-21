import 'server-only'
 
import { cookies } from 'next/headers'
import { decrypt } from '@/utils/encrypt-token'
import { redirect } from 'next/navigation'
import { cache } from 'react'
 
export const verifySession = cache(async () => {
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)
 
  if (!session?.id) {
    redirect('/login')
  }
 
  return { isAuth: true, userId: session.id }
})