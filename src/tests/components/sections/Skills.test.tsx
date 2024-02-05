import { render, screen } from "@testing-library/react";
import Skills from "src/components/sections/Skills";

describe("<Skills />", () => {
  it("should render Skills section", () => {
    render(<Skills skillList={["skill 1", "skill 2"]} />);
    expect(screen.getByTestId("skills-pillWrapper")).toBeInTheDocument();
    expect(screen.getAllByTestId("pill")).toHaveLength(2);
    expect(screen.getAllByTestId("pill")[0].textContent).toStrictEqual("skill 1");
  });
});
