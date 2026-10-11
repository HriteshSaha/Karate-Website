import { LegalPage, legalMetadata } from "@/components/LegalPage";

export const generateMetadata = () => legalMetadata("terms");

export default function TermsPage() {
  return <LegalPage slug="terms" />;
}
