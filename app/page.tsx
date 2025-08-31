import { VerificationFlow } from "@/components/verification/VerificationFlow";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Start Page',
  description: 'Start Page',
};

export default function Home() {
  return <VerificationFlow />;
}