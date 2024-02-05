const Pill = ({
  children,
  type,
  className,
}: {
  children: React.ReactNode;
  type?: string;
  className?: string;
}) => {
  let pillClass = "border-transparent text-white bg-dark-green";
  if (type === "outlined") {
    pillClass = "border-olive-green text-dark-green bg-transparent font-medium";
  }

  return (
    <div
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold font-secondary text-nowrap ${pillClass} ${className || ""}`}
      data-testid="pill"
    >
      {children}
    </div>
  );
};

const Wrapper = ({
  children,
  className,
  testId,
}: {
  children: React.ReactNode;
  className?: string;
  testId: string;
}) => {
  const classes = className
    ? `flex flex-wrap gap-1 mb-2 ${className}`
    : "flex flex-wrap gap-1 mb-2";
  return (
    <div className={classes} data-testid={`${testId}-pillWrapper`}>
      {children}
    </div>
  );
};

Pill.Wrapper = Wrapper;

export default Pill;
