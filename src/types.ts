export interface TalentEducation {
  school: string;
  schoolTR?: string;
  schoolEN?: string;
  degree: string;
  degreeTR?: string;
  degreeEN?: string;
  year?: string;
}

export interface Talent {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  roleLabel: string;
  roleLabelTR?: string;
  roleLabelEN?: string;
  image: string;
  carouselImages?: string[];
  bio: string;
  bioTR?: string;
  bioEN?: string;
  age: number;
  height: string;
  eyeColor: string;
  education: string;
  educations?: TalentEducation[];
  socials: {
    instagram: string;
    tiktok: string;
    youtube: string;
    kick?: string;
    twitch?: string;
    twitter?: string;
  };
  socialUrls?: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    kick?: string;
    twitch?: string;
    twitter?: string;
  };
  projects: Project[];
}

export interface Project {
  id: string;
  title: string;
  titleTR?: string;
  titleEN?: string;
  type: string;
  typeTR?: string;
  typeEN?: string;
  year?: string;
  role: string;
  roleTR?: string;
  roleEN?: string;
  image: string;
}

export interface Brand {
  id: string;
  name: string;
  image: string;
  height: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags?: string[];
  ctaText?: string;
  isPrimary?: boolean;
}
