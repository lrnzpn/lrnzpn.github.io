import Section from "src/components/ui/Section";
import { tailwindCommonStyles } from "src/utils/common";

const About = ({ summary }: { summary: string }) => {
  return (
    <Section>
      <h2 className={`${tailwindCommonStyles.heading} text-xl`}>About</h2>
      <p className={`${tailwindCommonStyles.text} text-sm`}>{summary}</p>
    </Section>
  );
};

export default About;
