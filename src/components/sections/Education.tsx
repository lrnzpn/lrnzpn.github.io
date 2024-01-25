import Card from "src/components/ui/Card";
import Section from "src/components/ui/Section";
import { EducationDataType } from "src/utils/ResumeDataTypes";
import { tailwindCommonStyles } from "src/utils/common";
const Education = ({ education }) => {
  const data = education as EducationDataType[];
  return (
    <Section>
      <h2 className={`${tailwindCommonStyles.heading} text-xl`}>Education</h2>
      {data.map((educ) => {
        return (
          <Card key={educ.school}>
            <Card.Header>
              <div className="flex items-center justify-between gap-x-2 text-base">
                <h3 className={`${tailwindCommonStyles.subheading}`}>{educ.school}</h3>
                <div className="font-primary text-sm text-brown text-pretty">
                  {educ.start} - {educ.end}
                </div>
              </div>
            </Card.Header>
            <Card.Content className="mt-2">{educ.degree}</Card.Content>
          </Card>
        );
      })}
    </Section>
  );
};

export default Education;
