import { render, screen, waitFor } from "@testing-library/react";
import Pill from "src/components/ui/Pill";

describe("<Pill />", () => {
  it("should render Pill component - default styles", () => {
    render(<Pill>test</Pill>);
    expect(screen.getByTestId("pill")).toBeInTheDocument();
    expect(screen.getByTestId("pill")).toHaveClass("border-transparent text-white bg-dark-green");
  });

  it("should render Pill component - outlined styles", () => {
    render(<Pill type="outlined">test</Pill>);
    waitFor(() => {
      expect(screen.getByTestId("pill")).toBeInTheDocument();
      expect(screen.getByTestId("pill")).toHaveClass(
        "border-olive-green text-white text-dark-green bg-transparent",
      );
    });
  });

  it("should render Pill Wrapper component", () => {
    render(<Pill.Wrapper testId="test">test</Pill.Wrapper>);
    expect(screen.getByTestId("test-pillWrapper")).toBeInTheDocument();
  });

  it("should render Pill Wrapper component - with additional styles", () => {
    render(
      <Pill.Wrapper testId="test" className="mx-2">
        test
      </Pill.Wrapper>,
    );
    expect(screen.getByTestId("test-pillWrapper")).toBeInTheDocument();
    expect(screen.getByTestId("test-pillWrapper")).toHaveClass("mx-2");
  });
});
