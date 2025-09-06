import { VerificationFlow } from "@/components/verification/VerificationFlow";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sandler Cinematic Style',
  description: 'Sandler Cinematic Style Page',
};

export default function Home() {
  return <VerificationFlow />;
}