const Pill = ({ children, type }: { children: React.ReactNode; type?: string }) => {
  let pillClass = "border-transparent text-white bg-dark-green hover:bg-black";
  if (type === "outlined") {
    pillClass = "border-olive-green text-dark-green bg-transparent";
  }

  return (
    <div
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold font-secondary text-nowrap ${pillClass}`}
    >
      {children}
    </div>
  );
};

export default Pill;
