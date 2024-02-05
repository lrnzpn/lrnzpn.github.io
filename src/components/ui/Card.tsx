import { tailwindCommonStyles } from "src/utils/common";

const Card = ({ children, testId }: { children: React.ReactNode; testId: string }) => {
  return (
    <div className="rounded-lg" data-testid={`${testId}-cardWrapper`}>
      {children}
    </div>
  );
};

const Header = ({ children, testId }: { children: React.ReactNode; testId: string }) => {
  return (
    <div className="flex flex-col space-y-1.5" data-testid={`${testId}-cardHeader`}>
      {children}
    </div>
  );
};

const Title = ({
  children,
  className,
  testId,
}: {
  children: React.ReactNode;
  className?: string;
  testId: string;
}) => {
  return (
    <h4
      className={`${tailwindCommonStyles.title} ${className || ""}`}
      data-testid={`${testId}-cardTitle`}
    >
      {children}
    </h4>
  );
};

const Description = ({
  children,
  className,
  testId,
}: {
  children: React.ReactNode;
  className?: string;
  testId: string;
}) => {
  return (
    <p
      className={`${tailwindCommonStyles.text} text-sm ${className || ""}`}
      data-testid={`${testId}-cardDesc`}
    >
      {children}
    </p>
  );
};

const Content = ({
  children,
  className,
  testId,
}: {
  children: React.ReactNode;
  className?: string;
  testId: string;
}) => {
  return (
    <div
      className={`flex flex-col overflow-hidden border border-olive-green p-3 rounded-lg ${className || ""}`}
      data-testid={`${testId}-cardContent`}
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
