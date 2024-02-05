export type UserDataType = {
  name: string;
  location: string;
  locationLink: string;
  about: string;
  contact: ContactDataType;
};

export type ContactDataType = {
  email: string;
  tel: string;
  social: any;
};

export type SocialDataType = {
  name: string;
  url: string;
  icon: any;
};

export type EducationDataType = {
  school: string;
  degree: string;
  start: string;
  end: string;
};

export type ExperienceDataType = {
  company: string;
  link: string;
  role: Array<{
    title: string;
    start: string;
    end: string;
    description: string;
    technologies: string[];
  }>;
};

export type ProjectsDataType = {
  title: string;
  techStack: string[];
  description: string;
  link?: string;
};
