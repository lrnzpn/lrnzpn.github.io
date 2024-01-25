const Button = ({ children, url }: { children: React.ReactNode; url: string }) => {
  return (
    <a
      className="size-6 inline-flex items-center justify-center fill-dark-green hover:fill-black"
      href={url}
    >
      {children}
    </a>
  );
};

export default Button;
