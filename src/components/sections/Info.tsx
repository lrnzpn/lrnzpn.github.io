import { EnvelopeIcon, GlobeIcon, MobileIcon } from "src/assets/icons";
import Avatar from "src/components/ui/Avatar";
import Button from "src/components/ui/Button";

import { RESUME_DATA } from "src/data/resumeData";
import { SocialDataType, UserDataType } from "src/utils/ResumeDataTypes";
import { tailwindCommonStyles } from "src/utils/common";

const Info = ({ information }) => {
  const data = information as UserDataType;

  return (
    <section className="flex items-center justify-between" data-testid="infoSection">
      <div className="flex-1 space-y-1.5">
        <h1 className={`${tailwindCommonStyles.heading} text-2xl`} data-testid="name">
          {data.name}
        </h1>
        <p className={`${tailwindCommonStyles.text} text-sm`} data-testid="about">
          {data.about}
        </p>
        <p className={`${tailwindCommonStyles.misc} text-xs`}>
          <a
            className="inline-flex gap-x-1.5 items-center hover:underline"
            href={data.locationLink}
            data-testid="location"
          >
            <GlobeIcon className="size-3 fill-brown" />
            {data.location}
          </a>
        </p>
        <div className="flex gap-x-1 pt-1 font-mono text-sm text-muted-foreground">
          {data.contact.email ? (
            <Button url={`mailto:${data.contact.email}`} testId="email">
              <EnvelopeIcon className="size-5" />
            </Button>
          ) : null}
          {data.contact.tel ? (
            <Button url={`tel:${data.contact.tel}`} testId="mobile">
              <MobileIcon className="size-5" />
            </Button>
          ) : null}
          {data.contact.social.map((social: SocialDataType) => (
            <Button key={social.name} url={social.url} testId={social.name}>
              <social.icon className="size-5" />
            </Button>
          ))}
        </div>
      </div>
      <Avatar alt={RESUME_DATA.initials} />
    </section>
  );
};

export default Info;
