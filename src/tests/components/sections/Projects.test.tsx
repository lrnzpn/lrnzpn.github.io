import { render, screen } from "@testing-library/react";
import Projects from "src/components/sections/Projects";

describe("<Project />", () => {
  it("should render Projects section", () => {
    render(
      <Projects
        projectsList={[
          {
            title: "Test",
            techStack: ["js"],
            description: "test",
            link: "www",
          },
          {
            title: "No link",
            techStack: ["js"],
            description: "test",
          },
        ]}
      />,
    );
    expect(screen.getAllByTestId("projects-cardContent")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("projects-cardTitle")[0]).toBeInTheDocument();
    expect(screen.getByTestId("projects-Nolink").textContent).toStrictEqual("No link");
    expect(screen.getByTestId("projects-Test").getAttribute("href")).toStrictEqual("www");
    expect(screen.getByTestId("projects-TestTech-pillWrapper")).toBeInTheDocument();
  });
});
