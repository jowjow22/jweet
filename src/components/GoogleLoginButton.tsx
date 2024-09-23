'use client'

import { Button } from "./ui/button"
import { signIn } from "next-auth/react"
import Image from 'next/image'
import Google from "@/assets/brands/google-icon.svg";

export const GoogleLoginButton = () => {
  return (
    <Button onClick={() => signIn("google", { callbackUrl: '/home' })}>
      <Image src={Google} alt="Google Logo" width={24} height={24} className="mr-2" />
      Sign in with Google
    </Button>
  )
}
