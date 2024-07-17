export default function HighlightedText({
  bgColor = "bg-sub-color",
  text = "text",
  textColor = "text-bg-color",
}) {
  return (
    <span
      className={`${textColor} ${bgColor} flex items-center rounded-sm px-1`}
    >
      {text}
    </span>
  );
}
