import Card from "src/components/ui/Card";
import Pill from "src/components/ui/Pill";
import Section from "src/components/ui/Section";
import { ProjectsDataType } from "src/utils/ResumeDataTypes";
import { tailwindCommonStyles } from "src/utils/common";

const Projects = ({ projectsList }) => {
  return (
    <Section>
      <h2 className={`${tailwindCommonStyles.heading} text-xl`}>Projects</h2>
      <div className="-mx-3 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {projectsList.map((project: ProjectsDataType) => {
          return (
            <Card.Content key={project.title} testId="projects">
              <Card.Title testId="projects">
                {project.link ? (
                  <a
                    className="cursor-pointer hover:underline decoration-brown decoration-2 underline-offset-2"
                    href={project.link}
                    data-testid={`projects-${project.title.replace(" ", "")}`}
                  >
                    {project.title}
                  </a>
                ) : (
                  <span data-testid={`projects-${project.title.replace(" ", "")}`}>
                    {project.title}
                  </span>
                )}
              </Card.Title>
              <Card.Description
                testId="projects"
                className="text-xs mt-1 mb-2 leading-5 text-balance"
              >
                {project.description}
              </Card.Description>
              <Pill.Wrapper
                className="mt-auto"
                testId={`projects-${project.title.replace(" ", "")}Tech`}
              >
                {project.techStack.map((tech) => {
                  return (
                    <Pill key={tech} type="outlined" className="text-[10px]">
                      {tech}
                    </Pill>
                  );
                })}
              </Pill.Wrapper>
            </Card.Content>
          );
        })}
      </div>
    </Section>
  );
};

export default Projects;
