export type IconName =
  | "award" | "chart" | "book" | "dumbbell" | "eye" | "heart"
  | "home" | "shield" | "star" | "target" | "trophy" | "users";

/** An image resolved to a URL, with an optional CSS object-position from the Studio hotspot. */
export type Img = { src: string; alt?: string | null; position?: string | null };

export type Hero = {
  eyebrow?: string;
  title: string;
  accent?: string;
  text?: string;
  ctaLabel?: string;
  image?: Img | null;
};

export type MobileHero = {
  layout?: "textTop" | "textBottom";
  image?: Img | null;
  eyebrow?: string;
  title: string;
  accent?: string;
  text?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  kanji?: string;
};
export type Heading = { eyebrow?: string; title?: string; accent?: string; text?: string };
export type IconCard = { _key?: string; icon: IconName; title: string; text: string };
export type Stat = { value: string; label: string };
export type SocialLink = { _key?: string; platform: string; url: string };
export type LinkItem = { _key?: string; label: string; href: string };
export type FormCard = { eyebrow?: string; title?: string; accent?: string; text?: string; perks?: string[] };

export type Settings = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  logoMark: string;
  logo?: Img | null;
  ogImage?: Img | null;
  stats: Stat[];
  achievement: Stat;
  phone: string;
  phoneLink: string;
  email: string;
  addressLines: string[];
  mapsUrl: string;
  hours: { _key?: string; days: string; time: string }[];
  phoneNote: string;
  emailNote: string;
  nav: LinkItem[];
  headerCtaLabel: string;
  footerBlurb: string;
  socials: SocialLink[];
  callLabel: string;
  emailLabel: string;
  visitLabel: string;
  hoursLabel: string;
  directionsLabel: string;
  footerLinksHeading: string;
  footerContactHeading: string;
  footerFollowHeading: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaText: string;
  ctaButtonLabel: string;
  ctaPerks: string[];
  ctaImage?: Img | null;
};

export type Program = {
  _id?: string;
  title: string;
  slug: string;
  ages: string;
  blurb: string;
  detail: string;
  image?: Img | null;
  benefits: string[];
};

export type Instructor = {
  _id?: string;
  name: string;
  role: string;
  rank: string;
  experience: string;
  focus: string;
  bio: string;
  photo?: Img | null;
  /** Photo has a transparent background (steps out of the card). */
  cutout?: boolean;
};

export type BeltColor = "white" | "yellow" | "orange" | "green" | "blue" | "purple" | "brown" | "black";
export type BeltLevel = { _id?: string; title: string; slug: string; color: BeltColor; description?: string };
export type Alumnus = {
  _id?: string;
  name: string;
  classOf?: string;
  headline?: string;
  story?: string;
  featured?: boolean;
  photo?: Img | null;
  belt: { title: string; slug: string; color: BeltColor } | null;
};
export type GalleryItem = { _key?: string; caption?: string; category?: string; image: Img };
export type Certification = { _id?: string; title: string; issuer?: string; year?: string; details?: string; badge?: Img | null };
export type Faq = { _id?: string; question: string; answer: string };

export type TimetableColor = "emerald" | "violet" | "amber" | "sky" | "rose" | "zinc";
export type TimetableCell = { title: string; color: TimetableColor } | null;
export type Timetable = { rows: { _key?: string; time: string; cells: TimetableCell[] }[] };

export type Content = {
  settings: Settings;
  home: {
    hero: Hero;
    mobileHero?: MobileHero;
    secondaryCtaLabel: string;
    marqueeWords: string[];
    highlights: IconCard[];
    programsSection: Heading;
    instructorsSection: Heading;
    scheduleSection: Heading;
    alumniSection: Heading;
    alumniButtonLabel: string;
    scheduleButtonLabel: string;
    gallerySection: Heading;
    galleryButtonLabel: string;
  };
  about: {
    hero: Hero;
    mobileHero?: MobileHero;
    storySection: Heading;
    storyParagraphs: string[];
    storyImage?: Img | null;
    storyQuote: string;
    valuesSection: Heading;
    values: IconCard[];
    whySection: Heading;
    why: IconCard[];
    certificationsSection: Heading;
  };
  programsPage: { hero: Hero; programCtaLabel: string };
  instructorsPage: { hero: Hero };
  schedulePage: { tableSection: Heading; note: string };
  galleryPage: { hero: Hero; introSection: Heading; categoriesLabel: string; items: GalleryItem[] };
  alumniPage: { hero: Hero; mobileHero?: MobileHero; introSection: Heading };
  contact: {
    hero: Hero;
    trialForm: FormCard;
    trialSubmitLabel: string;
    trialSuccess: string;
    callbackForm: FormCard;
    callbackSubmitLabel: string;
    callbackSuccess: string;
    whyReachSection: Heading;
    whyReach: IconCard[];
    faqSection: Heading;
    alumniSection: Heading;
    ageGroups: string[];
    programOptions: string[];
    experienceLevels: string[];
    classTimes: string[];
    callTimes: string[];
  };
  programs: Program[];
  instructors: Instructor[];
  beltLevels: BeltLevel[];
  alumni: Alumnus[];
  certifications: Certification[];
  faqs: Faq[];
  timetable: Timetable;
  legal: Record<string, { title: string; body: string }>;
};
