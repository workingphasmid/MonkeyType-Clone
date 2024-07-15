import { FaGlobeAmericas } from "react-icons/fa";

function Language() {
  return (
    <div className="flex items-center gap-4">
      <FaGlobeAmericas />
      english
    </div>
  );
}

function ToType() {
  return <div></div>;
}

export default function TypingArea() {
  return (
    <div className="mt-32 flex gap-8">
      <Language />
    </div>
  );
}
