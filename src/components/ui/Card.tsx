import { tailwindCommonStyles } from "src/utils/common";

const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className="rounded-lg">{children}</div>;
};

const Header = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col space-y-1.5">{children}</div>;
};

const Title = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <h4 className={`${tailwindCommonStyles.title} ${className || ""}`}>{children}</h4>;
};

const Description = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <p className={`${tailwindCommonStyles.text} text-sm ${className || ""}`}>{children}</p>;
};

const Content = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div
      className={`flex flex-col overflow-hidden border border-olive-green p-3 rounded-lg ${className || ""}`}
    >
      {children}
    </div>
  );
};

Card.Header = Header;
Card.Title = Title;
Card.Description = Description;
Card.Content = Content;

export default Card;
