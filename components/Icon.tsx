import {
  Award,
  BarChart3,
  BookOpen,
  Dumbbell,
  Eye,
  Heart,
  House,
  ShieldCheck,
  Star,
  Target,
  Trophy,
  Users,
  type LucideProps,
} from "lucide-react";

const icons = {
  award: Award,
  chart: BarChart3,
  book: BookOpen,
  dumbbell: Dumbbell,
  eye: Eye,
  heart: Heart,
  home: House,
  shield: ShieldCheck,
  star: Star,
  target: Target,
  trophy: Trophy,
  users: Users,
};

export function Icon({ name, ...props }: { name: keyof typeof icons } & LucideProps) {
  const C = icons[name] ?? Star; // unknown names from the CMS fall back to a star
  return <C aria-hidden="true" {...props} />;
}
