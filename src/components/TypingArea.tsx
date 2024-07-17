import { FaGlobeAmericas } from "react-icons/fa";

function Language() {
  return (
    <div className="flex items-center gap-4">
      <FaGlobeAmericas />
      english
    </div>
  );
}

function Caret() {
  return (
    <div className="absolute h-8 w-[.1em] animate-pulse bg-caret-color"></div>
  );
}

function ToType() {
  return (
    <div className="relative px-16 text-2xl">
      <Caret />
      In physics, power is the amount of energy transferred or converted per
      unit time. In the International System of Units, the unit of power is the
      watt, equal to one joule per second. Power is a scalar quantity.
    </div>
  );
}

export default function TypingArea() {
  return (
    <div className="mt-32 flex flex-col items-center gap-6">
      <Language />
      <ToType />
    </div>
  );
}
