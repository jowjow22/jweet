'use client'
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { CardContent, Card,CardDescription,CardFooter,CardHeader,CardTitle } from "@/components/ui/card";
import Google from "@/assets/brands/google-icon.svg";
import Image from 'next/image'

const LoginButton = () => {
  return (
    <Button onClick={() => signIn("google", { callbackUrl: '/home' })}>
      <Image src={Google} alt="Google Logo" width={24} height={24} className="mr-2" />
      Sign in with Google
    </Button>
  )
}

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="flex items-center flex-col">
        <CardHeader>
          <CardTitle>Bem vindo ao Jweet</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Para continuar, faça login com sua conta Google
          </CardDescription>
        </CardContent>
        <CardFooter>
          <LoginButton />
        </CardFooter>
      </Card>
    </div>
  );
}