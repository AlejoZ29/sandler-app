import { VerificationFlow } from "@/components/verification/VerificationFlow";
import type { Metadata } from "next";
import "./start-page.css";

export const metadata: Metadata = {
  title: 'Start Page',
  description: 'Start Page',
};

export default function Home() {
  return (
    <div className="page-start">
      <VerificationFlow />
    </div>
  );
}