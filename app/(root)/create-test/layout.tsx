import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Test App",
  description: "Test App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className='flex justify-start gap-5 mb-8 border-b border-b-dark-1'>
        <Link href={"/create-test/create"}>Create</Link>
        <Link href={"/create-test/edit"}>Edit</Link>
      </nav>
      {children}
    </>
  );
}
