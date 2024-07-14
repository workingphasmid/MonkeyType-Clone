import React from "react";
import Image from "next/image";
import logoIcon from "public/logo-icon.svg";
import {
  FaKeyboard,
  FaCrown,
  FaInfo,
  FaCog,
  FaBell,
  FaRegUser,
} from "react-icons/fa";
import { lexenddeca } from "@/app/layout";

type IconType = typeof FaKeyboard;

function HeaderIcon({ Icon }: { Icon: IconType }) {
  return (
    <div className="p-2 text-sub-color transition-colors hover:text-text-color">
      <Icon size={20} />
    </div>
  );
}

export default function Header() {
  return (
    <header className="flex items-center gap-2">
      {/* Left Section */}
      <div className="flex">
        <div className="flex h-6 gap-2">
          <Image src={logoIcon} alt="Logo Icon" width={40} />
          <h1
            className={`relative -mt-4 text-[32px] text-text-color ${lexenddeca.className}`}
          >
            <span className="absolute left-1 top-[2px] text-[.325em] text-sub-color">
              monkey see
            </span>
            monkeytype
          </h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-auto justify-between">
        <div className="flex gap-2">
          <HeaderIcon Icon={FaKeyboard} />
          <HeaderIcon Icon={FaCrown} />
          <HeaderIcon Icon={FaInfo} />
          <HeaderIcon Icon={FaCog} />
        </div>
        <div className="flex gap-2">
          <HeaderIcon Icon={FaBell} />
          <HeaderIcon Icon={FaRegUser} />
        </div>
      </div>
    </header>
  );
}
