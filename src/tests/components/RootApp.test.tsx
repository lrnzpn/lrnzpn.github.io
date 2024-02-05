import { render, screen } from "@testing-library/react";
import RootApp from "src/components/RootApp";

describe("<RootApp />", () => {
  it("should render Root", () => {
    render(<RootApp />);
    expect(screen.getByTestId("rootMain")).toBeInTheDocument();
    expect(screen.getByTestId("rootSectionWrapper")).toBeInTheDocument();
  });
});
