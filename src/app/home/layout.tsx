import { Navbar } from "@/components/Navbar/Navbar";
import { PostStoreProvider } from "@/providers/use-posts-store-provider";
import Link from "next/link";
import { verifySession } from "../../actions/actions";
import { userSchema } from "@/models/User";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await verifySession();
  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl">You need to be signed in to view this page</p>
        <Link href="/login" className="text-blue-500">
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
