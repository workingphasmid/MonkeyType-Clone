import { FaGlobeAmericas } from "react-icons/fa";
import { FaRedoAlt } from "react-icons/fa";
import HighlightedText from "./HighlightedText";
import ToType from "./ToType";

export default function TypingArea() {
  return (
    <div className="flex flex-1 flex-col justify-between">
      <div className="mt-32 flex flex-col items-center gap-6">
        <Language />
        <ToType />
        <FaRedoAlt />
      </div>
      <HotKeys />
    </div>
  );
}

function Language() {
  return (
    <div className="flex items-center gap-4">
      <FaGlobeAmericas />
      english
    </div>
  );
}

function HotKeys() {
  return (
    <div className="flex flex-col items-center gap-2 text-[12px]">
      <div className="flex">
        <HighlightedText text="off" />
        &nbsp;- restart test
      </div>
      <div className="flex gap-2">
        <HighlightedText text="esc" />
        or
        <HighlightedText text="ctrl" />
        +
        <HighlightedText text="shift" />
        +
        <HighlightedText text="p" />
        &nbsp;- command line
      </div>
    </div>
  );
}
