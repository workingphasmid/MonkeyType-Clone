"use client";

import { words } from "@/lib/data";
import { forwardRef, useRef, useState } from "react";

type WordType = {
  word: string;
  wordIndex: number;
  currentWordIndex: number;
  setCurrentWordIndex: any;
  ref: React.RefObject<HTMLDivElement>;
};

export default function ToType() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const currentWordRef = useRef<HTMLDivElement>(null);

  console.log(currentWordRef.current);
  return (
    <div className="relative px-16 text-2xl">
      <Caret />
      {words.map((word, i) => (
        <Word
          key={i}
          word={word}
          wordIndex={i}
          currentWordIndex={currentWordIndex}
          setCurrentWordIndex={setCurrentWordIndex}
          ref={currentWordRef}
        />
      ))}
    </div>
  );
}

const Word = forwardRef<HTMLDivElement, WordType>(
  ({ word, wordIndex, currentWordIndex, setCurrentWordIndex }, ref) => {
    const [letterIndex, setLetterIndex] = useState(0);

    const letters = word.split("");

    function handleKeydown(e: any) {
      if (word.length === letterIndex + 1) {
        setCurrentWordIndex(currentWordIndex + 1);
        setLetterIndex(0);
      } else {
        setLetterIndex(letterIndex + 1);
      }
    }

    return (
      <div
        className="mx-2 inline-block"
        tabIndex={0}
        autoFocus={true}
        onKeyDown={handleKeydown}
        ref={currentWordIndex === wordIndex ? ref : null}
      >
        {letters.map((letter, i) => (
          <span key={i}>{letter}</span>
        ))}
        {letterIndex}
      </div>
    );
  },
);

function Caret() {
  return (
    <div className="absolute h-8 w-[.1em] animate-pulse bg-caret-color"></div>
  );
}
