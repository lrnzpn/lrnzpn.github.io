const Button = ({
  children,
  url,
  testId,
}: {
  children: React.ReactNode;
  url: string;
  testId: string;
}) => {
  return (
    <a
      className="size-6 inline-flex items-center justify-center fill-dark-green hover:fill-black"
      href={url}
      data-testid={`btn-${testId}`}
    >
      {children}
    </a>
  );
};

export default Button;
