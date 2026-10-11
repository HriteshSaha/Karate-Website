import { notFound } from "next/navigation";
import { getContent, getPublishedContent, paragraphs } from "@/lib/content";
import { Container } from "./ui";

export async function legalMetadata(slug: string) {
  const { legal } = await getPublishedContent();
  return { title: legal[slug]?.title ?? "Legal" };
}

export async function LegalPage({ slug }: { slug: string }) {
  const { legal } = await getContent();
  const page = legal[slug];
  if (!page) notFound();

  return (
    <Container className="max-w-3xl py-12 sm:py-16">
      <h1 className="display text-4xl text-ink">{page.title}</h1>
      <div className="mt-6 space-y-4 leading-7 text-zinc-700">
        {paragraphs(page.body).map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </Container>
  );
}
