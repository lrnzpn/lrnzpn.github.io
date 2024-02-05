import { Me } from "src/assets/images";

const Avatar = ({ alt }: { alt: string }) => {
  // ? Add error handling if png does not load ?
  return (
    <div className="relative flex shrink-0 overflow-hidden rounded-xl size-28 border border-olive-green">
      <img className="aspect-square h-full w-full" src={Me} alt={alt} data-testid="avatarImg" />
    </div>
  );
};

export default Avatar;
