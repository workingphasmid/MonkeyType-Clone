"use client";

import { letters, letterColors as initialLetterColors } from "@/lib/data";
import { forwardRef, useEffect, useRef, useState } from "react";

type letterType = { letter: string; color: string };
type caretPositionType = { top: number; left: number };

export default function ToType() {
  const [index, setIndex] = useState(0);
  const [letterColors, setLetterColors] = useState(initialLetterColors);
  const [caretPosition, setCaretPosition] = useState({ top: 0, left: 0 });
  const [isTyping, setIsTyping] = useState(false);

  const letterRef = useRef<HTMLSpanElement>(null);

  function handleTyping(event: KeyboardEvent) {
    if (event.key === letters[index]) {
      setIndex(index + 1);
      updateLetterColor(index, "text-text-color");
      setIsTyping(true);

      // Updating the caret position
      if (letterRef.current) {
        const currentLetterRect = letterRef.current?.getBoundingClientRect();
        const currentLetterWidth = currentLetterRect.width;
        const currentLetterheight = currentLetterRect.height;

        if (currentLetterWidth === 0) {
          setCaretPosition({
            left: 0,
            top: caretPosition.top + currentLetterheight,
          });
        } else {
          setCaretPosition({
            ...caretPosition,
            left: caretPosition.left + currentLetterWidth,
          });
        }
      }
    }
  }

  function updateLetterColor(index: number, color: string) {
    setLetterColors((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = color;
      return newColors;
    });
  }

  // Initial Event for Keydown (typing) to Window
  useEffect(() => {
    window.addEventListener("keydown", handleTyping);

    return () => window.removeEventListener("keydown", handleTyping);
  }, [index]);

  return (
    <div className="relative cursor-default text-2xl">
      <Caret caretPosition={caretPosition} isTyping={isTyping} />
      {letters.map((letter, i) => (
        <Letter
          key={i}
          letter={letter}
          color={letterColors[i]}
          ref={i === index ? letterRef : null}
        />
      ))}
    </div>
  );
}

const Letter = forwardRef<HTMLSpanElement, letterType>(
  ({ letter, color }, ref) => {
    return (
      <span ref={ref} className={color}>
        {letter}
      </span>
    );
  },
);

function Caret({
  caretPosition,
  isTyping,
}: {
  caretPosition: caretPositionType;
  isTyping: boolean;
}) {
  const caretStyle = {
    top: Math.round(caretPosition.top) + "px",
    left: Math.round(caretPosition.left) + "px",
    animation: "pulse 1s ease-in-out infinite",
  };

  if (isTyping) {
    caretStyle.animation = "";
  }

  return (
    <div
      className="absolute left-0 top-0 h-8 w-[.1em] bg-caret-color transition-all duration-75"
      style={caretStyle}
    ></div>
  );
}
