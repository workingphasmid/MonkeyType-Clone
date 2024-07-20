"use client";

import { letters, letterColors as initialLetterColors } from "@/lib/data";
import { forwardRef, useEffect, useRef, useState } from "react";

type letterType = { letter: string; color: string };
type caretPositionType = { top: number; left: number };

export default function ToType() {
  const [index, setIndex] = useState(0);
  const [letterColors, setLetterColors] = useState(initialLetterColors);
  const [caretPosition, setCaretPosition] = useState({ top: 0, left: 0 });

  const letterRef = useRef<HTMLSpanElement>(null);

  function handleTyping(event: KeyboardEvent) {
    if (event.key === letters[index]) {
      setIndex(index + 1);
      updateLetterColor(index, "text-text-color");

      // Updating the caret position
      if (letterRef.current) {
        const currentLetterRect = letterRef.current?.getBoundingClientRect();
        const currentLetterWidth = currentLetterRect.width;
        const currentLetterheight = currentLetterRect.height;

        if (currentLetterWidth === 0) {
          setCaretPosition({ left: 0, top: currentLetterheight });
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
      <Caret caretPosition={caretPosition} />
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

function Caret({ caretPosition }: { caretPosition: caretPositionType }) {
  return (
    <div
      className="absolute left-0 top-0 h-8 w-[.1em] animate-pulse bg-caret-color"
      style={{ top: caretPosition.top + "px", left: caretPosition.left + "px" }}
    ></div>
  );
}
