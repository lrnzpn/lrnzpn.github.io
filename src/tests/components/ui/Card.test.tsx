import { render, screen } from "@testing-library/react";
import Card from "src/components/ui/Card";

describe("<Avatar />", () => {
  it("should render Card wrapper", () => {
    render(<Card testId="test">test</Card>);
    expect(screen.getByTestId("test-cardWrapper")).toBeInTheDocument();
  });

  it("should render Card header", () => {
    render(<Card.Header testId="test">test</Card.Header>);
    expect(screen.getByTestId("test-cardHeader")).toBeInTheDocument();
  });

  it("should render Card title", () => {
    render(<Card.Title testId="test">test</Card.Title>);
    expect(screen.getByTestId("test-cardTitle")).toBeInTheDocument();
  });

  it("should render Card description", () => {
    render(<Card.Description testId="test">test</Card.Description>);
    expect(screen.getByTestId("test-cardDesc")).toBeInTheDocument();
  });

  it("should render Card content", () => {
    render(<Card.Content testId="test">test</Card.Content>);
    expect(screen.getByTestId("test-cardContent")).toBeInTheDocument();
  });
});
