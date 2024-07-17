import { IconType } from "react-icons";
import {
  FaEnvelope,
  FaDonate,
  FaCode,
  FaDiscord,
  FaTwitter,
  FaFileContract,
  FaShieldAlt,
  FaLock,
  FaPalette,
  FaCodeBranch,
} from "react-icons/fa";

export default function Footer() {
  return (
    <div className="flex items-center justify-between pt-6">
      <div className="flex gap-4">
        <Items Icon={FaEnvelope} title="contact" />
        <Items Icon={FaDonate} title="support" />
        <Items Icon={FaCode} title="github" />
        <Items Icon={FaDiscord} title="discord" />
        <Items Icon={FaTwitter} title="twitter" />
        <Items Icon={FaFileContract} title="terms" />
        <Items Icon={FaShieldAlt} title="security" />
        <Items Icon={FaLock} title="privacy" />
      </div>
      <div className="flex gap-4">
        <Items Icon={FaPalette} title="serika dark" />
        <Items Icon={FaCodeBranch} title="v.24.29.0" />
      </div>
    </div>
  );
}

function Items({ title, Icon }: { title: string; Icon: IconType }) {
  return (
    <div className="flex items-center gap-2 text-[12px] text-sub-color">
      <Icon />
      {title}
    </div>
  );
}
