import { GithubIcon, InstagramIcon, LinkedInIcon, XIcon } from "src/assets/icons";

export const RESUME_DATA = {
  name: "Lorenzo Migel Pinaroc",
  initials: "LMP",
  location: "Quezon City, Philippines",
  locationLink: "https://www.google.com/maps/place/Quezon+City",
  about: "Problem-Solver. Fast-paced Learner. Solution-builder.",
  summary:
    "I'm a full-stack developer with experience in data science. I have worked on projects from different internships that involve NLP and computer vision. Currently, I am a software engineer for Maya Philippines, where I am honing my skills as a developer and a leader.",
  contact: {
    email: "migzpinaroc@gmail.com",
    tel: "+639175316225",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/lrnzpn",
        icon: GithubIcon,
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/miggypinaroc",
        icon: InstagramIcon,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/lrnzmp/",
        icon: LinkedInIcon,
      },
      {
        name: "X",
        url: "https://x.com/lrnzpn",
        icon: XIcon,
      },
    ],
  },
  education: [
    {
      school: "Ateneo de Manila University",
      degree: "Bachelor's Degree in Computer Science, Specialization in Data Science and Analytics",
      start: "2016",
      end: "2021",
    },
  ],
  work: [
    {
      company: "Maya",
      link: "https://www.maya.ph/",
      role: [
        {
          title: "Software Engineer",
          start: "Mar 2022",
          end: "Present",
          description:
            "Responsible for the maintenance of Business Deposits Web App built with Angular, adding new features and improving its UI. Contributes to the creation of new endpoints for its Golang backend for frontend. Currently, I am leading the migration of the application to a microfrontend built using React, and helping explore the use of GraphQL to improve our services and performance.",
          technologies: ["Javascript", "Angular", "React", "Typescript", "Golang", "GraphQL"],
        },
        {
          title: "Cadet Engineer",
          start: "Aug 2021",
          end: "Mar 2022",
          description:
            "Participated in the Maya (former PayMaya) Tech Cadetship Program which involved a two-week bootcamp on software development tools, cloud services and infrastructure and applied DevOps. Was immersed in the various roles related to product engineering and data science for five months. Was given the chance to work with a team to apply the skills we learned in the cadetship, and was able to contribute to the account and deposit services using Java Spring.",
          technologies: [
            "Git",
            "Amazon Web Services",
            "Docker",
            "Kubernetes",
            "Machine Learning",
            "Credit Scoring",
            "Credit Risk Modeling",
            "Data Visualization",
            "Data Analysis",
            "Natural Language Processing",
            "Java",
            "Java Spring Boot",
          ],
        },
      ],
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "jQuery",
    "Angular",
    "React",
    "Vue",
    "Nuxt",
    "Node.js",
    "ExpressJS",
    "Golang",
    "Java",
    "Java Spring",
    "Python",
    "Django",
    "GraphQL",
    "Git",
    "AWS",
    "Docker",
    "Kubernetes",
  ],
  projects: [
    {
      title: "Off Tangent",
      techStack: ["The GUIDON", "Interactive", "NuxtJS", "Vue"],
      description:
        "My third and final interactive site built with Nuxt along with fellow devs of the GUIDON. Off Tangent tells the stories of Ateneans and their experience of online learning.",
      link: "https://interactive.theguidon.com/2021/07/off-tangent/",
    },
    {
      title: "Underpowered",
      techStack: ["The GUIDON", "Interactive", "NuxtJS", "Vue"],
      description:
        "My second interactive site built with Nuxt, a VueJS framework. Narrates the reality of Filipinos who encounter having a lack of electricity and those with sufficient supply of power.",
      link: "https://interactive.theguidon.com/2021/04/underpowered/",
    },
    {
      title: "The GUIDON Online",
      techStack: ["The GUIDON", "Interactive", "Vue", "Javascript"],
      description:
        "My first interactive site built with Vue. Discusses on the GUIDON transitioning to an online publication as it has reached its 90th year last 2020.",
      link: "https://interactive.theguidon.com/2020/06/tgdn-90th/",
    },
  ],
} as const;
