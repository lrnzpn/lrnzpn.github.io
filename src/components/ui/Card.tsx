import { tailwindCommonStyles } from "src/utils/common";

const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className="rounded-lg">{children}</div>;
};

const Header = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col space-y-1.5">{children}</div>;
};

const Title = ({ children }: { children: React.ReactNode }) => {
  return <h3>{children}</h3>;
};

const Description = ({ children }: { children: React.ReactNode }) => {
  return <p>{children}</p>;
};

const Content = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={`${className} ${tailwindCommonStyles.text} text-sm`}>{children}</div>;
};

Card.Header = Header;
Card.Title = Title;
Card.Description = Description;
Card.Content = Content;

export default Card;
