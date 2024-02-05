import { render, screen } from "@testing-library/react";
import Section from "src/components/ui/Section";

describe("<Section />", () => {
  it("should render Section component", () => {
    render(<Section>test</Section>);
    expect(screen.getByTestId("section")).toBeInTheDocument();
  });
});
