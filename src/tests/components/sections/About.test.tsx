import { render, screen } from "@testing-library/react";
import About from "src/components/sections/About";

describe("<About />", () => {
  it("should render About section", () => {
    render(<About summary={"TEST SUMMARY"} />);
    expect(screen.getByTestId("aboutSummary")).toBeInTheDocument();
    expect(screen.getByTestId("aboutSummary").textContent).toBe("TEST SUMMARY");
  });
});
