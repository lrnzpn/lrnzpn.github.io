import { FC, ReactNode } from "react";

const Section: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return <section className="flex min-h-0 flex-col gap-y-3">{children}</section>;
};

export default Section;
