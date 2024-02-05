import { render, screen } from "@testing-library/react";
import Experience from "src/components/sections/Experience";

const mockData = [
  {
    company: "Test",
    link: "www",
    role: [
      {
        title: "SWE",
        start: "2021",
        end: "2023",
        description: "SWE test",
        technologies: ["js", "rust"],
      },
    ],
  },
];

describe("<Experience />", () => {
  it("should render Experience section", () => {
    render(<Experience experienceList={mockData} />);
    expect(screen.getAllByTestId("experience-cardWrapper")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("experience-cardHeader")[0]).toBeInTheDocument();
    expect(screen.getByTestId("company-Test").textContent).toStrictEqual("Test");
    expect(screen.getByTestId("experience-cardTitle").textContent).toStrictEqual("SWE");
    expect(screen.getByTestId("companyTest-duration").textContent).toStrictEqual("2021 - 2023");
    expect(screen.getAllByTestId("experience-cardDesc")[0].textContent).toStrictEqual("SWE test");
    expect(screen.getByTestId("exp-TestTech-pillWrapper")).toBeInTheDocument();
  });
});
