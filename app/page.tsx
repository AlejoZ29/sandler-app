import type { Metadata } from "next";
export const metadata: Metadata = {
 title: 'Start Page',
 description: 'Start Page',
};

export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="text-2xl font-bold text-white">En proceso...</div>
    </div>
  );
}