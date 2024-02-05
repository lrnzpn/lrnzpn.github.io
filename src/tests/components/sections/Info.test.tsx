import { render, screen } from "@testing-library/react";
import Info from "src/components/sections/Info";

const mockData = {
  name: "Test",
  about: "Hello World",
  locationLink: "www.test.com",
  location: "earth",
  contact: {
    email: "test@test.com",
    tel: "123456789",
    social: [
      {
        name: "facebook",
        url: "fb.com",
        icon: jest.fn(),
      },
      {
        name: "twitter",
        url: "twitter.com",
        icon: jest.fn(),
      },
    ],
  },
};

describe("<Info />", () => {
  it("should render Info section", () => {
    render(<Info information={mockData} />);
    expect(screen.getByTestId("name").textContent).toStrictEqual("Test");
    expect(screen.getByTestId("about").textContent).toStrictEqual("Hello World");
    expect(screen.getByTestId("location").textContent).toStrictEqual("earth");
    expect(screen.getByTestId("location").getAttribute("href")).toStrictEqual("www.test.com");
    expect(screen.getByTestId("btn-email")).toBeInTheDocument();
    expect(screen.getByTestId("btn-email").getAttribute("href")).toStrictEqual(
      "mailto:test@test.com",
    );
    expect(screen.getByTestId("btn-mobile")).toBeInTheDocument();
    expect(screen.getByTestId("btn-mobile").getAttribute("href")).toStrictEqual("tel:123456789");
  });

  it("should render Info section - with missing data not rendered", () => {
    render(
      <Info
        information={{
          name: "Test",
          about: "Hello World",
          locationLink: "www.test.com",
          location: "earth",
          contact: {
            social: [
              {
                name: "facebook",
                url: "fb.com",
                icon: jest.fn(),
              },
            ],
          },
        }}
      />,
    );
    expect(screen.queryByTestId("btn-email")).not.toBeInTheDocument();
    expect(screen.queryByTestId("btn-mobile")).not.toBeInTheDocument();
  });
});
