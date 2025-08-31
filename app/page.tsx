import { Button, Logo } from "@/components";
import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
 title: 'Start Page',
 description: 'Start Page',
};

export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center justify-center h-screen p-8 gap-16 sm:p-20">
      <Logo/>
      <Link href={'/verify'}>
        <Button textButton="Ingresar"/>
      </Link>
    </div>
  );
}