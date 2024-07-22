"use client";

import { words } from "@/lib/data";
import { forwardRef, useRef, useState, KeyboardEvent } from "react";

type WordType = {
  word: string;
  wordIndex: number;
  currentWordIndex: number;
  updateCurrentWord: any;
  ref: React.RefObject<HTMLDivElement>;
};

export default function ToType() {
  const [currentWordIndex, setCurrentWordIndex] = useState(1);
  const currentWordRef = useRef<HTMLDivElement>(null);

  function updateCurrentWord(e: KeyboardEvent) {
    setCurrentWordIndex(currentWordIndex + 1);
    currentWordRef.current?.focus();
  }

  return (
    <div className="relative px-16 text-2xl">
      <Caret />
      {words.map((word, i) => (
        <Word
          key={i}
          word={word}
          wordIndex={i}
          currentWordIndex={currentWordIndex}
          updateCurrentWord={updateCurrentWord}
          ref={currentWordRef}
        />
      ))}
    </div>
  );
}

const Word = forwardRef<HTMLDivElement, WordType>(
  ({ word, wordIndex, currentWordIndex, updateCurrentWord }, ref) => {
    const [letterIndex, setLetterIndex] = useState(0);
    const [letters, setLetters] = useState(word.split(""));

    function handleKeydown(e: KeyboardEvent) {
      const atEnd = letters.length === letterIndex;
      const pressedKey = e.key;

      // Wall: Ending the key if its not valid
      if (!/^[\s\w'",.?!;:@#$%&()]$/.test(pressedKey)) {
        return;
      }

      if (!atEnd) {
        setLetterIndex(letterIndex + 1);
        return;
      }

      if (pressedKey !== " ") {
        const newLetters = [...letters];
        newLetters[letterIndex] = pressedKey;

        setLetterIndex(letterIndex + 1);
        setLetters(newLetters);
      } else if (pressedKey === " ") {
        updateCurrentWord(e);
      }
    }

    return (
      <div
        className="mx-2 inline-block"
        tabIndex={0}
        autoFocus={true}
        onKeyDown={(e) => handleKeydown(e)}
        ref={currentWordIndex === wordIndex ? ref : null}
      >
        {letters.map((letter, i) => (
          <span key={i}>{letter}</span>
        ))}
      </div>
    );
  },
);

function Caret() {
  return (
    <div className="absolute h-8 w-[.1em] animate-pulse bg-caret-color"></div>
  );
}
