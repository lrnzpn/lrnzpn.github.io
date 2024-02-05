import Pill from "src/components/ui/Pill";
import Section from "src/components/ui/Section";
import { tailwindCommonStyles } from "src/utils/common";

const Skills = ({ skillList }) => {
  return (
    <Section>
      <h2 className={`${tailwindCommonStyles.heading} text-xl`}>Skills</h2>
      <Pill.Wrapper>
        {skillList.map((skill: string) => {
          return <Pill key={skill}>{skill}</Pill>;
        })}
      </Pill.Wrapper>
    </Section>
  );
};

export default Skills;
