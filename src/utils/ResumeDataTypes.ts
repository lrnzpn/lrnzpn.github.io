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
