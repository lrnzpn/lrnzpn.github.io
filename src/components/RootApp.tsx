import { RESUME_DATA } from "src/data/resumeData";
import About from "./sections/About";
import Education from "./sections/Education";
import Experience from "./sections/Experience";
import Info from "./sections/Info";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";

const RootApp = () => {
  return (
    <main
      className="container relative mx-auto scroll-my-12 overflow-auto p-4 bg-white md:p-16"
      data-testid="rootMain"
    >
      <div className="mx-auto w-full max-w-2xl space-y-8" data-testid="rootSectionWrapper">
        <Info information={RESUME_DATA} />
        <About summary={RESUME_DATA.summary} />
        <Education education={RESUME_DATA.education} />
        <Experience experienceList={RESUME_DATA.work} />
        <Skills skillList={RESUME_DATA.skills} />
        <Projects projectsList={RESUME_DATA.projects} />
      </div>
    </main>
  );
};

export default RootApp;
