import { CardContent, Card,CardDescription,CardFooter,CardHeader,CardTitle } from "@/components/ui/card";
import { GoogleLoginButton as LoginButton } from "@/components/GoogleLoginButton";
import { redirectIfAuthenticated } from '@/actions/actions'


export default async function Home() {
  await redirectIfAuthenticated()

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