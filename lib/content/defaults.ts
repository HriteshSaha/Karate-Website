// Built-in content: the site renders this whenever Sanity has no document for a section,
// and `scripts/seed.ts` uses it to populate the Studio the first time.
// Relative imports only — the seed script runs outside Next.js.
import type { Content, Img, TimetableColor } from "./types";

const img = (file: string, position: string, alt = ""): Img => ({
  src: `/images/${file}`,
  alt,
  position,
});

/** Class types used to build the default timetable (also seeded as `classType` documents). */
export const classColors: Record<string, TimetableColor> = {
  "Kids Karate": "emerald",
  Teens: "violet",
  "Adult Karate": "amber",
  Advanced: "sky",
  Competition: "rose",
  "Open Mat": "zinc",
};

export const defaults: Content = {
  settings: {
    name: "Kizen Karate Academy",
    shortName: "Kizen",
    tagline: "A stronger you. A brighter tomorrow.",
    description:
      "Kizen Karate Academy teaches traditional karate to kids, teens and adults. Build discipline, strength and confidence — book a free trial class today.",
    logoMark: "改",
    logo: null,
    ogImage: img("hero-training.webp", "70% 40%"),
    stats: [
      { value: "500+", label: "Students Trained" },
      { value: "15+", label: "Years of Excellence" },
      { value: "40+", label: "Classes Per Week" },
      { value: "12+", label: "Certified Instructors" },
    ],
    achievement: { value: "Multiple", label: "Tournament Champions" },
    phone: "(951) 123-4567",
    phoneLink: "+19511234567",
    email: "info@kizenkarate.com",
    addressLines: ["123 Martial Arts Way", "Riverside, CA 92506"],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=123+Martial+Arts+Way+Riverside+CA+92506",
    hours: [
      { days: "Monday – Friday", time: "9:00 AM – 8:00 PM" },
      { days: "Saturday", time: "8:00 AM – 4:00 PM" },
      { days: "Sunday", time: "Closed" },
    ],
    phoneNote: "Mon – Fri, 9am – 8pm",
    emailNote: "We'll respond within 1 hour",
    nav: [
      { label: "Home", href: "/" },
      { label: "Programs", href: "/programs" },
      { label: "About", href: "/about" },
      { label: "Instructors", href: "/instructors" },
      { label: "Gallery", href: "/gallery" },
      { label: "Alumni", href: "/alumni" },
      { label: "Contact", href: "/contact" },
    ],
    headerCtaLabel: "Book a Free Trial",
    footerBlurb:
      "Traditional values. Modern training. Real results. Kizen Karate Academy helps build stronger individuals and a stronger community.",
    socials: [
      { platform: "facebook", url: "https://facebook.com" },
      { platform: "instagram", url: "https://instagram.com" },
      { platform: "youtube", url: "https://youtube.com" },
      { platform: "tiktok", url: "https://tiktok.com" },
    ],
    callLabel: "Call us",
    emailLabel: "Email us",
    visitLabel: "Visit our dojo",
    hoursLabel: "Business hours",
    directionsLabel: "Get directions →",
    footerLinksHeading: "Quick Links",
    footerContactHeading: "Contact Info",
    footerFollowHeading: "Follow Us",
    ctaEyebrow: "Discipline today. A brighter tomorrow.",
    ctaTitle: "Start your karate journey today",
    ctaText: "Book a free trial class and experience the difference at Kizen Karate Academy.",
    ctaButtonLabel: "Book a Free Trial",
    ctaPerks: ["No obligation", "All ages welcome", "Friendly instructors"],
    ctaImage: img("banner-sunset.webp", "50% 50%"),
  },

  home: {
    hero: {
      eyebrow: "Tradition • Discipline • A stronger you",
      title: "Build discipline. Strength.",
      accent: "Confidence.",
      text: "More than karate — we help kids, teens and adults become stronger, more focused and more confident, on and off the mat.",
      ctaLabel: "Start Training",
      image: img("hero-training.webp", "50% 50%"),
    },
    mobileHero: {
      layout: "textTop",
      image: img("m-hero-warrior.webp", "50% 0%", "A karate student mid-punch in front of a red brush circle"),
      title: "Unleash Your",
      accent: "Inner Warrior",
      text: "Build discipline, strength, and confidence with expert karate training for all levels.",
      primaryLabel: "Start training",
      primaryHref: "/programs",
      secondaryLabel: "Book a free trial",
      secondaryHref: "/contact#trial",
      kanji: "武道情",
    },
    secondaryCtaLabel: "View Classes",
    marqueeWords: ["Discipline", "Respect", "Strength", "Focus", "Honor", "Perseverance"],
    highlights: [
      { icon: "shield", title: "Self-Defense", text: "Practical skills for real-world confidence." },
      { icon: "users", title: "Kids Karate", text: "Build focus, respect and confidence early." },
      { icon: "dumbbell", title: "Adult Training", text: "Get fit, de-stress and challenge yourself." },
      { icon: "chart", title: "Fitness & Discipline", text: "Stronger body, sharper mind." },
      { icon: "award", title: "Certified Instructors", text: "Learn from experienced, credentialed black belts." },
      { icon: "home", title: "Safe Environment", text: "A positive, supportive dojo for all ages." },
    ],
    programsSection: {
      eyebrow: "Our programs",
      title: "Classes for every age & goal",
      text: "Whether you're looking for self-defense, fitness, competition or personal growth, we have a program that fits your journey.",
    },
    instructorsSection: {
      eyebrow: "Meet our instructors",
      title: "Experienced. Passionate.",
      accent: "Invested.",
    },
    scheduleSection: {
      eyebrow: "Class schedule",
      title: "Find a class that fits your",
      accent: "schedule.",
      text: "Kids, teens and adults train every weekday. See the full weekly timetable and pick a time that works for you.",
    },
    scheduleButtonLabel: "View weekly schedule",
    alumniSection: {
      eyebrow: "Our alumni",
      title: "Where karate",
      accent: "takes you.",
      text: "From white belt beginners to black belt leaders — meet the students who started where you are now.",
    },
    alumniButtonLabel: "View more alumni",
    gallerySection: { eyebrow: "Life at Kizen", title: "More than a dojo.", accent: "A community." },
    galleryButtonLabel: "View full gallery",
  },

  about: {
    hero: {
      eyebrow: "Tradition • Discipline • A stronger you",
      title: "More than a dojo.",
      accent: "A community.",
      text: "At Kizen Karate Academy, we believe karate is more than self-defense — it's a path to greater confidence, discipline, respect and a stronger, more focused you.",
      ctaLabel: "Book a Free Trial",
      image: img("banner-family.webp", "75% 40%"),
    },
    mobileHero: {
      layout: "textTop",
      image: img("m-hero-skills.webp", "50% 0%", "A sensei shaking hands with a young student"),
      title: "Build More Than",
      accent: "Fighting Skills",
      text: "Develop confidence, respect, and discipline through expert karate training for kids, teens, and adults.",
      primaryLabel: "Book a free trial",
      primaryHref: "/contact#trial",
      secondaryLabel: "Meet our instructors",
      secondaryHref: "/instructors",
    },
    storySection: { eyebrow: "Our story", title: "A stronger community builds", accent: "brighter tomorrows." },
    storyParagraphs: [
      "Kizen Karate Academy was founded with a simple belief: karate can change lives. What started as a small dojo with a big vision has grown into a thriving community of students and families who share a commitment to discipline, personal growth and mutual respect.",
      "For over 15 years, we've helped kids, teens and adults build stronger minds, healthier bodies and greater confidence — on and off the mat. Our academy is more than a place to train. It's a supportive, inclusive community where people of all ages challenge themselves, achieve their goals and belong.",
    ],
    storyImage: img("banner-handshake.webp", "50% 40%", "A sensei shaking hands with a young student in the dojo"),
    storyQuote: "“A stronger you builds a stronger world.”",
    valuesSection: {
      eyebrow: "Our mission, vision & values",
      title: "Guided by a higher purpose.",
      text: "Everything we do is rooted in a commitment to helping individuals become stronger, more confident and more connected — on and off the mat.",
    },
    values: [
      { icon: "target", title: "Our Mission", text: "To empower individuals of all ages through karate, building stronger, healthier and more confident lives." },
      { icon: "eye", title: "Our Vision", text: "To be a leading karate academy known for developing confident, respectful and resilient individuals who make a positive impact in their communities." },
      { icon: "users", title: "Our Values", text: "Discipline in everything we do. Respect for ourselves and others. Personal growth through challenge. A supportive, inclusive community." },
      { icon: "chart", title: "Our Purpose", text: "To create a positive and lasting impact in the lives of our students, families and community through the transformative power of karate." },
    ],
    certificationsSection: {
      eyebrow: "Credentials",
      title: "Certified and",
      accent: "accredited.",
      text: "Our instructors and dojo meet recognised standards for rank, safety and teaching.",
    },
    whySection: { eyebrow: "Why families choose Kizen", title: "A supportive community for every journey." },
    why: [
      { icon: "shield", title: "Safe Training Environment", text: "A positive, supportive dojo for all ages." },
      { icon: "book", title: "Structured Curriculum", text: "Age-appropriate programs with clear goals and progress." },
      { icon: "heart", title: "Character Development", text: "Builds focus, respect and leadership skills for life." },
      { icon: "trophy", title: "Competition Opportunities", text: "For students who want to take their training to the next level." },
      { icon: "users", title: "Supportive Community", text: "A welcoming family environment where everyone belongs." },
      { icon: "star", title: "Personal Attention", text: "Small class sizes and dedicated instructors who care." },
    ],
  },

  programsPage: {
    hero: {
      eyebrow: "Our programs",
      title: "Classes for every",
      accent: "age & goal.",
      text: "Whether you want self-defense, fitness, competition or personal growth, there's a place for you on our mat.",
      ctaLabel: "Book a Free Trial",
      image: img("hero-training.webp", "70% 40%"),
    },
    programCtaLabel: "Try a Free Class",
  },

  instructorsPage: {
    hero: {
      eyebrow: "Meet our instructors",
      title: "Experienced. Passionate.",
      accent: "Invested in you.",
      text: "Our instructors bring years of training, teaching and real-world experience to help every student reach their full potential.",
      image: img("banner-family.webp", "72% 35%"),
    },
  },

  schedulePage: {
    tableSection: { eyebrow: "Weekly timetable", title: "Class", accent: "schedule" },
    note: "Saturday sessions and seminars are announced on our socials. Questions? Call",
  },

  galleryPage: {
    hero: {
      eyebrow: "Life at Kizen",
      title: "Moments from",
      accent: "the dojo.",
      text: "Training days, belt ceremonies and the people who make our community what it is.",
      image: img("banner-handshake.webp", "60% 40%"),
    },
    introSection: { eyebrow: "Gallery", title: "Every class tells a story" },
    categoriesLabel: "All",
    items: [
      { image: img("hero-training.webp", "72% 42%", "Karate student mid-punch"), caption: "Kata practice", category: "Training" },
      { image: img("banner-handshake.webp", "48% 40%", "A sensei shaking hands with a young student"), caption: "First day handshake", category: "Community" },
      { image: img("banner-family.webp", "72% 35%", "Sensei with his students"), caption: "Sensei and students", category: "Ceremonies" },
      { image: img("banner-sunset.webp", "18% 50%", "A karateka overlooking the mountains at sunset"), caption: "Morning meditation", category: "Training" },
      { image: img("hero-training.webp", "56% 40%", "Partner drills"), caption: "Partner drills", category: "Training" },
      { image: img("banner-handshake.webp", "20% 50%", "Students watching a class"), caption: "Class gathers", category: "Community" },
      { image: img("banner-family.webp", "30% 50%", "Dojo lanterns and banners"), caption: "The dojo at dusk", category: "Ceremonies" },
      { image: img("banner-sunset.webp", "86% 40%", "The torii gate on the ridge"), caption: "The torii gate", category: "Ceremonies" },
      { image: img("banner-handshake.webp", "86% 50%", "Cheering teammates"), caption: "Cheering teammates", category: "Community" },
      { image: img("banner-family.webp", "86% 50%", "Proud students looking up"), caption: "Proud students", category: "Community" },
      { image: img("hero-training.webp", "30% 55%", "Smoke and focus"), caption: "Focus and form", category: "Training" },
      { image: img("banner-sunset.webp", "52% 62%", "Mountain training retreat"), caption: "Mountain retreat", category: "Training" },
    ],
  },

  alumniPage: {
    hero: {
      eyebrow: "Our alumni",
      title: "Every black belt",
      accent: "started as a white belt.",
      text: "Meet the students who trained, grew and moved on to do great things — grouped by the belt they earned with us.",
      image: img("banner-family.webp", "75% 40%"),
    },
    mobileHero: {
      layout: "textBottom",
      image: img("m-hero-stronger.webp", "50% 0%", "A sensei surrounded by his students"),
      eyebrow: "Building",
      accent: "Stronger",
      title: "Humans",
      text: "Discipline | Confidence | Respect",
      primaryLabel: "Join our dojo",
      primaryHref: "/contact#trial",
    },
    introSection: {
      eyebrow: "By belt level",
      title: "Find your story",
      text: "Browse our alumni by belt, from first-day white belts to seasoned black belts.",
    },
  },

  contact: {
    hero: {
      eyebrow: "Contact us",
      title: "Let's start",
      accent: "your journey.",
      text: "Have questions? Ready to book a trial class? We're here to help — for kids, teens and adults.",
      ctaLabel: "Book a Free Trial",
      image: img("banner-handshake.webp", "60% 40%"),
    },
    trialForm: {
      eyebrow: "Quick registration",
      title: "Book a",
      accent: "free trial class",
      text: "Fill out the form to register for a trial class. It's a great way to experience our dojo, meet our instructors and see if karate is the right fit for you.",
      perks: ["No obligation", "All ages welcome", "Meet our instructors", "See our dojo", "Find the perfect program for your goals"],
    },
    trialSubmitLabel: "Register Now",
    trialSuccess: "Thank you! Your free trial request is in. We'll be in touch shortly to confirm your class.",
    callbackForm: {
      eyebrow: "Enquiry / request a call back",
      title: "Have a question? We'll",
      accent: "call you back.",
      text: "Fill out the form and a member of our team will get in touch as soon as possible (usually within 1 hour) to answer your questions.",
      perks: ["Get program details", "Ask about schedules", "Learn about pricing", "Find the right program for your child or yourself", "No pressure, just helpful guidance"],
    },
    callbackSubmitLabel: "Request a Call Back",
    callbackSuccess: "Thanks! A member of our team will call you back soon (usually within 1 hour).",
    whyReachSection: { eyebrow: "Why reach out to Kizen?", title: "More than a dojo.", accent: "A supportive community." },
    whyReach: [
      { icon: "users", title: "All Ages Welcome", text: "Kids, teens and adults find their place here." },
      { icon: "shield", title: "Beginner Friendly", text: "No experience needed. We'll guide you every step of the way." },
      { icon: "award", title: "Certified Instructors", text: "Learn from experienced, passionate instructors who care." },
      { icon: "heart", title: "A Strong Community", text: "Be part of a positive, respectful and encouraging environment." },
    ],
    faqSection: { eyebrow: "Frequently asked questions", title: "Quick answers before you reach out." },
    alumniSection: { eyebrow: "Our alumni", title: "Real people.", accent: "Real journeys." },
    ageGroups: ["Child (4–7)", "Child (8–12)", "Teen (13–17)", "Adult (18+)"],
    programOptions: ["Kids Karate", "Teens Program", "Adult Training", "Competition Team", "Not sure yet"],
    experienceLevels: ["Complete beginner", "Some experience", "Previous belt rank"],
    classTimes: ["Weekday afternoon", "Weekday evening", "Saturday morning"],
    callTimes: ["Morning (9–12)", "Afternoon (12–5)", "Evening (5–8)"],
  },

  programs: [
    {
      title: "Kids Karate",
      slug: "kids",
      ages: "Ages 4–12",
      blurb: "Build confidence, focus and respect through fun, structured training.",
      detail: "Our kids program turns energy into discipline. Games, drills and age-appropriate technique teach focus, respect and resilience — while building real karate skills belt by belt.",
      image: img("banner-handshake.webp", "48% 40%"),
      benefits: ["Improved focus and listening", "Coordination and fitness", "Anti-bullying confidence", "Respect for self and others"],
    },
    {
      title: "Teens Program",
      slug: "teens",
      ages: "Ages 13–17",
      blurb: "Develop leadership, discipline and real-world self-defense skills.",
      detail: "Teens train harder and think bigger. Expect stronger technique, practical self-defense, leadership opportunities and a positive crowd that pushes each other to grow.",
      image: img("hero-training.webp", "76% 30%"),
      benefits: ["Practical self-defense", "Leadership and mentoring roles", "Stress relief and fitness", "Pathway to black belt"],
    },
    {
      title: "Adult Training",
      slug: "adults",
      ages: "Ages 18+",
      blurb: "Get fit, learn self-defense and build mental resilience.",
      detail: "No experience needed. Adult classes combine conditioning, kata, kumite and self-defense in a respectful, supportive environment — train for fitness, focus or the long road to black belt.",
      image: img("banner-family.webp", "68% 25%"),
      benefits: ["Full-body conditioning", "Self-defense fundamentals", "Mental clarity and stress relief", "Train at your own pace"],
    },
    {
      title: "Competition Team",
      slug: "competition",
      ages: "All Ages",
      blurb: "Train at a higher level and compete in regional and national tournaments.",
      detail: "For students ready to test themselves. Our competition coaches build kata and kumite athletes through focused technique, sparring and tournament preparation.",
      image: img("hero-training.webp", "52% 35%"),
      benefits: ["Kata and kumite coaching", "Regional and national events", "Advanced sparring sessions", "Mental performance training"],
    },
  ],

  instructors: [
    { name: "Sensei Daniel Park", role: "Chief Instructor", rank: "5th Dan Black Belt", experience: "15+ Years Experience", focus: "Adult & Advanced Training", bio: "Daniel founded Kizen with a simple belief: karate can change lives. He leads the senior classes and oversees the curriculum." },
    { name: "Sensei Maria Lopez", role: "Kids Program Director", rank: "4th Dan Black Belt", experience: "12+ Years Experience", focus: "Children's Development", bio: "Maria designs our kids curriculum, blending fun with real technique so young students grow in confidence and character." },
    { name: "Sensei James Miller", role: "Competition Coach", rank: "4th Dan Black Belt", experience: "10+ Years Experience", focus: "Regional & National Coaching", bio: "A former tournament champion, James coaches our kata and kumite athletes for regional and national competition." },
    { name: "Sensei Emily Chen", role: "Adult Program Instructor", rank: "3rd Dan Black Belt", experience: "8+ Years Experience", focus: "Women's Self-Defense", bio: "Emily leads our adult fundamentals and women's self-defense workshops with clear, practical instruction." },
  ],

  beltLevels: [
    { title: "White Belt", slug: "white", color: "white", description: "Day one. Every journey starts here — learning the basics, the bow and the courage to begin." },
    { title: "Yellow Belt", slug: "yellow", color: "yellow", description: "First steps in technique, with growing focus and a love of training." },
    { title: "Orange Belt", slug: "orange", color: "orange", description: "Building strength, balance and the habit of showing up." },
    { title: "Green Belt", slug: "green", color: "green", description: "Confidence grows as techniques sharpen and sparring begins." },
    { title: "Blue Belt", slug: "blue", color: "blue", description: "Depth and discipline — students start to teach by example." },
    { title: "Purple Belt", slug: "purple", color: "purple", description: "Advanced technique, leadership and a calm, focused mindset." },
    { title: "Brown Belt", slug: "brown", color: "brown", description: "The final stretch toward black belt, built on years of dedication." },
    { title: "Black Belt", slug: "black", color: "black", description: "The beginning of mastery. Our black belt alumni lead, teach and inspire." },
  ],

  alumni: [
    { name: "Liam Carter", classOf: "Class of 2024", headline: "Student · Joined at age 7", story: "Liam was shy on his first day. A year later he leads the warm-up for his whole class.", featured: true, belt: { title: "White Belt", slug: "white", color: "white" } },
    { name: "Sofia Alvarez", classOf: "Class of 2025", headline: "Designer · Started at 34", story: "I wanted to feel strong again. White belt taught me that the first step is the hardest and the best.", featured: false, belt: { title: "White Belt", slug: "white", color: "white" } },
    { name: "Noah Bennett", classOf: "Class of 2023", headline: "Student · Age 9", story: "Yellow belt made me love Saturday mornings. I never miss a class now.", featured: false, belt: { title: "Yellow Belt", slug: "yellow", color: "yellow" } },
    { name: "Aisha Rahman", classOf: "Class of 2024", headline: "Nurse · Age 29", story: "Karate became my favorite way to switch off after a long shift.", featured: false, belt: { title: "Yellow Belt", slug: "yellow", color: "yellow" } },
    { name: "Ethan Brooks", classOf: "Class of 2022", headline: "Student · Age 11", story: "I used to get nervous in front of people. Now I help the new kids learn their stances.", featured: false, belt: { title: "Orange Belt", slug: "orange", color: "orange" } },
    { name: "Mei Lin", classOf: "Class of 2023", headline: "Teacher · Age 38", story: "Orange belt was when it clicked — I realised I was getting stronger every week.", featured: false, belt: { title: "Orange Belt", slug: "orange", color: "orange" } },
    { name: "Jack Thompson", classOf: "Class of 2021", headline: "Student · Age 13", story: "Sparring was scary at first. Now it is the part of class I look forward to most.", featured: true, belt: { title: "Green Belt", slug: "green", color: "green" } },
    { name: "Priya Nair", classOf: "Class of 2022", headline: "Engineer · Age 31", story: "Green belt gave me a focus I carry into work every day.", featured: false, belt: { title: "Green Belt", slug: "green", color: "green" } },
    { name: "Marcus Hill", classOf: "Class of 2021", headline: "Firefighter · Age 36", story: "Great for fitness, great for the mind. I recommend it to everyone on my crew.", featured: false, belt: { title: "Green Belt", slug: "green", color: "green" } },
    { name: "Olivia Reed", classOf: "Class of 2020", headline: "Student · Age 15", story: "Blue belt is when I started helping teach the younger students. It changed how I see leadership.", featured: false, belt: { title: "Blue Belt", slug: "blue", color: "blue" } },
    { name: "Daniel Kim", classOf: "Class of 2020", headline: "Accountant · Age 33", story: "Years of training taught me patience. I use it in every busy season.", featured: false, belt: { title: "Blue Belt", slug: "blue", color: "blue" } },
    { name: "Hannah Scott", classOf: "Class of 2019", headline: "University student", story: "Purple belt pushed me to train harder than I thought I could — and to enjoy it.", featured: false, belt: { title: "Purple Belt", slug: "purple", color: "purple" } },
    { name: "Rohan Patel", classOf: "Class of 2019", headline: "Physiotherapist", story: "Understanding how the body moves made me better at karate and at my job.", featured: false, belt: { title: "Purple Belt", slug: "purple", color: "purple" } },
    { name: "Lucas Meyer", classOf: "Class of 2018", headline: "Software engineer", story: "Brown belt took real grit. The sensei believed in me before I did.", featured: true, belt: { title: "Brown Belt", slug: "brown", color: "brown" } },
    { name: "Grace Nguyen", classOf: "Class of 2018", headline: "Competitor", story: "Competing at nationals as a brown belt was the proudest moment of my teens.", featured: false, belt: { title: "Brown Belt", slug: "brown", color: "brown" } },
    { name: "Tom Wallace", classOf: "Class of 2017", headline: "Chef", story: "Long nights in the kitchen, early mornings in the dojo. Worth every minute.", featured: false, belt: { title: "Brown Belt", slug: "brown", color: "brown" } },
    { name: "Ava Morales", classOf: "Class of 2016", headline: "Instructor · 2nd Dan", story: "I started at eight. Today I teach the kids' class — full circle.", featured: true, belt: { title: "Black Belt", slug: "black", color: "black" } },
    { name: "Kenji Tanaka", classOf: "Class of 2015", headline: "Doctor · 3rd Dan", story: "Black belt is not the end. It is when you finally understand how much there is to learn.", featured: false, belt: { title: "Black Belt", slug: "black", color: "black" } },
    { name: "Chloe Anderson", classOf: "Class of 2016", headline: "Police officer · 1st Dan", story: "The discipline and calm I learned here help me every single day.", featured: false, belt: { title: "Black Belt", slug: "black", color: "black" } },
    { name: "Ben Harper", classOf: "Class of 2014", headline: "Business owner · 2nd Dan", story: "I still train twice a week. The dojo is my second home.", featured: true, belt: { title: "Black Belt", slug: "black", color: "black" } },
  ],

  certifications: [
    { title: "Black belt certified instructors", issuer: "National Karate Federation", year: "Since 2011", details: "Every lead instructor holds a verified black belt rank and is re-certified regularly. Ranks are awarded through formal grading panels." },
    { title: "First aid and CPR trained", issuer: "Red Cross approved course", year: "Renewed yearly", details: "All coaching staff hold current first aid and CPR certification, so classes of every age run with trained responders on the mat." },
    { title: "Background-checked coaches", issuer: "Independent screening", year: "Every year", details: "Everyone who works with students has passed an enhanced background check, repeated annually, so families can train with confidence." },
    { title: "Registered dojo and insured", issuer: "Association member", year: "Active", details: "Kizen is a registered member dojo with full liability insurance, and follows the association's safety and grading standards." },
  ],

  faqs: [
    { question: "What ages do you accept?", answer: "We welcome students from age 4 through adults. Classes are grouped by age and experience so everyone trains with peers." },
    { question: "Do I need any prior experience?", answer: "None at all. Most of our students start as complete beginners, and instructors guide you through every step." },
    { question: "How do I book a trial class?", answer: "Fill in the free trial form on our Contact page, or call us. We'll confirm a class time that suits you." },
    { question: "What should I wear for the trial class?", answer: "Comfortable athletic clothing — a T-shirt and loose pants work well. You'll train barefoot. We provide a uniform once you join." },
    { question: "Do you offer programs for adults?", answer: "Yes. Adult classes run every weekday evening, from fundamentals to advanced training and sparring." },
    { question: "Where are you located and do you have parking?", answer: "We're at 123 Martial Arts Way, Riverside, CA. There is free parking directly outside the dojo." },
  ],

  timetable: {
    rows: (
      [
        ["4:00 PM", ["Kids Karate", "Kids Karate", "Kids Karate", "Kids Karate", "Open Mat"]],
        ["5:00 PM", ["Teens", "Teens", "Teens", "Teens", "Competition"]],
        ["6:00 PM", ["Adult Karate", "Adult Karate", "Adult Karate", "Adult Karate", "Adult Karate"]],
        ["7:00 PM", ["Advanced", "Advanced", "Competition", "Advanced", "Open Mat"]],
      ] as [string, string[]][]
    ).map(([time, names]) => ({
      time,
      cells: names.map((n) => ({ title: n, color: classColors[n] })),
    })),
  },

  legal: {
    privacy: {
      title: "Privacy Policy",
      body: "Placeholder text — have this reviewed and replaced before launch.\n\nKizen Karate Academy collects the details you submit through our trial and enquiry forms (name, contact details and message) only to respond to your request and arrange classes.\n\nWe do not sell your information. You can ask us to delete your details at any time by emailing us.",
    },
    terms: {
      title: "Terms of Service",
      body: "Placeholder text — have this reviewed and replaced before launch.\n\nBy booking a trial class or using this website you agree to follow Kizen Karate Academy's dojo rules and to train safely and respectfully. Martial arts involve physical activity; students participate at their own risk and should tell instructors about any injuries or conditions.\n\nQuestions? Contact us by email or phone.",
    },
  },
};
