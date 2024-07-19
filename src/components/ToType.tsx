"use client";

import { letters, letterColors as initialLetterColors } from "@/lib/data";
import { forwardRef, useEffect, useRef, useState } from "react";

type letterType = { letter: string; color: string };

export default function ToType() {
  const [index, setIndex] = useState(0);
  const [letterColors, setLetterColors] = useState(initialLetterColors);
  const [caretPosition, setCaretPosition] = useState("");

  const letterRef = useRef(null);
  console.log(letterRef.current);

  function handleTyping(event: KeyboardEvent) {
    if (event.key === letters[index]) {
      setIndex(index + 1);
      updateLetterColor(index, "text-text-color");
    }
  }

  function updateLetterColor(index: number, color: string) {
    setLetterColors((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = color;
      return newColors;
    });
  }

  useEffect(() => {
    window.addEventListener("keydown", handleTyping);

    return () => window.removeEventListener("keydown", handleTyping);
  }, [index]);

  return (
    <div className="relative cursor-default px-16 text-2xl">
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

function Caret({ caretPosition }: { caretPosition: string }) {
  return (
    <div
      className={`absolute h-8 w-[.1em] left-[${caretPosition}] animate-pulse bg-caret-color`}
    ></div>
  );
}
