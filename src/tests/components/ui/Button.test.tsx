import { render, screen } from "@testing-library/react";
import Button from "src/components/ui/Button";

describe("<Button />", () => {
  it("should render Button component", () => {
    render(
      <Button url="test" testId="test">
        test
      </Button>,
    );
    expect(screen.getByTestId("btn-test")).toBeInTheDocument();
  });
});
