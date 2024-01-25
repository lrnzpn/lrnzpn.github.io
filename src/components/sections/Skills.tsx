import Pill from "src/components/ui/Pill";
import Section from "src/components/ui/Section";
import { tailwindCommonStyles } from "src/utils/common";

const Skills = ({ skillList }) => {
  return (
    <Section>
      <h2 className={`${tailwindCommonStyles.heading} text-xl`}>Skills</h2>
      <div className="flex flex-wrap gap-1">
        {skillList.map((skill: string) => {
          return (
            <Pill key={skill} type="outlined">
              {skill}
            </Pill>
          );
        })}
      </div>
    </Section>
  );
};

export default Skills;
