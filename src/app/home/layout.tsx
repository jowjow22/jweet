import { Navbar } from "@/components/Navbar/Navbar";
import { PostStoreProvider } from "@/providers/use-posts-store-provider";
import Link from "next/link";
import { verifySession } from "../../actions/actions";
import { userSchema } from "@/models/User";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await verifySession();
  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen flex-col gap-y-2">
        <p className="text-2xl">You need to be signed in to view this page</p>
        
        <Link href="/" className={cn(
        buttonVariants({variant: "default"}),
          "dark:bg-transparent dark:text-white dark:hover:bg-muted dark:hover:text-white bg-transparent text-black hover:bg-muted",
        "justify-start"
      )}>
          Sign in
        </Link>
      </div>
    );
  }

  const user = userSchema.parse(session.user);

  return (
    <section className="flex flex-col">
      <PostStoreProvider>
        <Navbar user={user} />
        {children}
      </PostStoreProvider>
    </section>
  );
}
