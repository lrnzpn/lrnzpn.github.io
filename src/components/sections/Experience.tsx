import Card from "src/components/ui/Card";
import Pill from "src/components/ui/Pill";
import Section from "src/components/ui/Section";
import { ExperienceDataType } from "src/utils/ResumeDataTypes";
import { tailwindCommonStyles } from "src/utils/common";

const Experience = ({ experienceList }) => {
  return (
    <Section>
      <h2 className={`${tailwindCommonStyles.heading} text-xl`}>Experience</h2>
      {experienceList.map((exp: ExperienceDataType) => {
        return (
          <Card key={exp.company}>
            <Card.Header>
              <h3 className={`${tailwindCommonStyles.subheading}`}>{exp.company}</h3>
            </Card.Header>
            {exp.role.map((role) => {
              return (
                <div key={role.title}>
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <Card.Title className="mt-2 underline decoration-olive-green decoration-2 underline-offset-2">
                      {role.title}
                    </Card.Title>
                    <div className={`${tailwindCommonStyles.miscDate}`}>
                      {role.start} - {role.end}
                    </div>
                  </div>
                  <Card.Description className="my-3">{role.description}</Card.Description>
                  <Pill.Wrapper>
                    {role.technologies.map((tech) => {
                      return (
                        <Pill key={tech} type="outlined">
                          {tech}
                        </Pill>
                      );
                    })}
                  </Pill.Wrapper>
                </div>
              );
            })}
          </Card>
        );
      })}
    </Section>
  );
};

export default Experience;
