import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ButtonLink, Container } from "@/components/ui";
import { getContent } from "@/lib/content";

export default async function NotFound() {
  const { settings } = await getContent();
  return (
    <>
      <Header brand={settings} nav={settings.nav} ctaLabel={settings.headerCtaLabel} />
      <main className="flex-1 bg-black py-28 text-center">
        <Container>
          <p className="eyebrow">Error 404</p>
          <h1 className="display mt-3 text-5xl text-white sm:text-6xl">
            Page not <span className="text-brand">found.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-zinc-300">
            Looks like this page took a different path. Let&apos;s get you back to the dojo.
          </p>
          <div className="mt-7 flex justify-center">
            <ButtonLink href="/">Back to Home</ButtonLink>
          </div>
        </Container>
      </main>
      <Footer settings={settings} />
    </>
  );
}
