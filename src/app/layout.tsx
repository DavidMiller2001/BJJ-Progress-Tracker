import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bjj Progress Tracker",
  description: "created by David Miller using create-t3-app and shadcn",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body className="">
          <Nav />
          <main className="flex h-screen items-center justify-center sm:pt-36">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}

function Nav() {
  return (
    <header>
      <nav className="fixed z-10 top-0 flex w-full items-center justify-between bg-black p-4 text-white">
        <Link href="/">
          <h2 className="text-lg font-semibold">Calendar</h2>
        </Link>
        <div>
          <SignedOut>
            <Button
              asChild
              variant={"ghost"}
              className="text-md outline outline-2 outline-white"
            >
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
