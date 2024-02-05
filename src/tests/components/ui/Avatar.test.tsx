import { render, screen } from "@testing-library/react";
import Avatar from "src/components/ui/Avatar";

describe("<Avatar />", () => {
  it("should render avatar", () => {
    render(<Avatar alt="test" />);
    expect(screen.getByTestId("avatarImg")).toBeInTheDocument();
  });
});
