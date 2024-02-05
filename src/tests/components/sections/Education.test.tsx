import { render, screen } from "@testing-library/react";
import Education from "src/components/sections/Education";

describe("<Education />", () => {
  it("should render Education section", () => {
    render(
      <Education
        education={[
          {
            school: "Test School",
            start: "2016",
            end: "2020",
            degree: "BS CS",
          },
        ]}
      />,
    );
    expect(screen.getByTestId("education-cardWrapper")).toBeInTheDocument();
    expect(screen.getByTestId("school").textContent).toStrictEqual("Test School");
    expect(screen.getByTestId("TestSchool-duration").textContent).toStrictEqual("2016 - 2020");
    expect(screen.getByTestId("education-cardDesc").textContent).toStrictEqual("BS CS");
  });
});
