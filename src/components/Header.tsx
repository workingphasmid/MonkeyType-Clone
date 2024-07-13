import React from "react";
import Image from "next/image";
import logoIcon from "public/logo-icon.svg";
import { FaKeyboard, FaCrown, FaInfo, FaCog, FaBell, FaRegUser } from "react-icons/fa";

export default function Header() {
  return (
    <div>
      {/* Left Section */}
      <div>
        <div>
          <Image src={logoIcon} alt="Logo Icon" width={40} />
          <span>monkeytype</span>
        </div>
        <div>
          <FaKeyboard size={20} />
          <FaCrown size={20} />
          <FaInfo size={20} />
          <FaCog size={20} />
        </div>
      </div>

      {/* Right Section */}
      <div>
        <FaBell />
        <FaRegUser />
      </div>
    </div>
  );
}
