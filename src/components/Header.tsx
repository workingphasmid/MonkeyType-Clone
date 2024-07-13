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
    <div className="">
      <Icon size={20} />
    </div>
  );
}

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      {/* Left Section */}
      <div className="flex">
        <div className="flex h-6 gap-2">
          <Image src={logoIcon} alt="Logo Icon" width={40} />
          <h1
            className={`-mt-4 text-[32px] text-text-color ${lexenddeca.className}`}
          >
            monkeytype
          </h1>
        </div>
        <div className="flex">
          <HeaderIcon Icon={FaKeyboard} />
          <HeaderIcon Icon={FaCrown} />
          <HeaderIcon Icon={FaInfo} />
          <HeaderIcon Icon={FaCog} />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex">
        <HeaderIcon Icon={FaBell} />
        <HeaderIcon Icon={FaRegUser} />
      </div>
    </header>
  );
}
