"use client";

import { letters, letterColors as initialLetterColors } from "@/lib/data";
import { useEffect, useState } from "react";

export default function ToType() {
  const [index, setIndex] = useState(0);
  const [letterColors, setLetterColors] = useState(initialLetterColors);

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
      <Caret />
      {letters.map((letter, i) => (
        <Letter key={i} letter={letter} color={letterColors[i]} />
      ))}
    </div>
  );
}

function Letter({ letter, color }: { letter: string; color: string }) {
  return <span className={color}>{letter}</span>;
}

function Caret() {
  return (
    <div className="absolute h-8 w-[.1em] animate-pulse bg-caret-color"></div>
  );
}
