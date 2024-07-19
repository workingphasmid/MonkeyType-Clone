"use client";

import { letters, letterColors as initialLetterColors } from "@/lib/data";
import { forwardRef, useEffect, useRef, useState } from "react";

type letterType = { letter: string; color: string };

export default function ToType() {
  const [index, setIndex] = useState(0);
  const [letterColors, setLetterColors] = useState(initialLetterColors);
  const [caretPosition, setCaretPosition] = useState(0);

  const letterRef = useRef<HTMLSpanElement>(null);

  function handleTyping(event: KeyboardEvent) {
    if (event.key === letters[index]) {
      setIndex(index + 1);
      updateLetterColor(index, "text-text-color");

      // Updating the caret position
      if (letterRef.current) {
        const currentLetterWidth =
          letterRef.current.getBoundingClientRect().width;

        setCaretPosition(caretPosition + currentLetterWidth);
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

function Caret({ caretPosition }: { caretPosition: number }) {
  return (
    <div
      className="absolute left-0 top-0 h-8 w-[.1em] animate-pulse bg-caret-color"
      style={{ left: caretPosition + "px" }}
    ></div>
  );
}
