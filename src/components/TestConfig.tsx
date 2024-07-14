import {
  FaAt,
  FaHashtag,
  FaClock,
  FaFont,
  FaQuoteLeft,
  FaMountain,
  FaWrench,
  FaTools,
} from "react-icons/fa";

type IconType = typeof FaAt;

function Button({ Icon, name }: { Icon: IconType; name: string }) {
  return (
    <button className="flex items-center gap-2">
      <Icon size={12} />
      <h3 className="text-xs">{name}</h3>
    </button>
  );
}

function Separator() {
  return <div className="h-6 w-2 rounded-full bg-bg-color"></div>;
}

function Number({ number }: { number: string }) {
  return <span className="text-xs">{number}</span>;
}

export default function TestConfig() {
  return (
    <div className="flex gap-7 rounded-md bg-sub-alt-color px-6 py-2">
      <div className="flex items-center gap-6">
        <Button Icon={FaAt} name="punctuation" />
        <Button Icon={FaHashtag} name="numbers" />
      </div>
      <Separator />
      <div className="flex items-center gap-6">
        <Button Icon={FaClock} name="time" />
        <Button Icon={FaFont} name="words" />
        <Button Icon={FaQuoteLeft} name="qoute" />
        <Button Icon={FaMountain} name="zen" />
        <Button Icon={FaWrench} name="custom" />
      </div>
      <Separator />
      <div className="flex items-center gap-6">
        <Number number="15" />
        <Number number="30" />
        <Number number="60" />
        <Number number="120" />
        <FaTools size={12} />
      </div>
    </div>
  );
}
