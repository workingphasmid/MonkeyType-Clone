"use client";

import { words } from "@/lib/data";
import { useRef, useState } from "react";

type WordType = { word: string };

export default function ToType() {
  return (
    <div className="relative px-16 text-2xl">
      <Caret />
      {words.map((word, i) => (
        <Word word={word} key={i} />
      ))}
    </div>
  );
}

function Word({ word }: WordType) {
  const [letterIndex, setLetterIndex] = useState(0);
  const currentLetterRef = useRef<HTMLSpanElement>(null);

  const letters = word.split("");

  function handleKeydown(e: any) {
    setLetterIndex(letterIndex + 1);
  }

  return (
    <div
      className="mx-2 inline-block"
      tabIndex={0}
      autoFocus={true}
      onKeyDown={handleKeydown}
    >
      {letters.map((letter, i) => (
        <span key={i} ref={letterIndex === i ? currentLetterRef : null}>
          {letter}
        </span>
      ))}
      {letterIndex}
    </div>
  );
}

function Caret() {
  return (
    <div className="absolute h-8 w-[.1em] animate-pulse bg-caret-color"></div>
  );
}
