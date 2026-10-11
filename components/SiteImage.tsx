import Image, { type ImageProps } from "next/image";
import type { Img } from "@/lib/content/types";

/** Fills its (relatively positioned) parent with a Sanity or local image, honouring the Studio hotspot. */
export function SiteImage({
  img,
  position,
  ...props
}: { img?: Img | null; position?: string } & Omit<ImageProps, "src" | "alt" | "fill" | "style">) {
  if (!img?.src) return null;
  return (
    <Image
      {...props}
      src={img.src}
      alt={img.alt ?? ""}
      fill
      style={{ objectPosition: position ?? img.position ?? "50% 50%" }}
    />
  );
}
