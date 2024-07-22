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
    const [lettersColor, setLettersColor] = useState(Array<string>);

    function handleKeydown(e: KeyboardEvent) {
      const atEnd = letters.length === letterIndex;
      const pressedKey = e.key;
      const pattern = /^[\s\w'",.?!;:@#$%&()]$/;

      // Wall: Ending the key if its not valid
      if (!pattern.test(pressedKey) && pressedKey !== "Backspace") {
        return;
      }

      // Updating the word and letter indexes
      const isFirstLetter = letterIndex === 0;
      const isSpace = pressedKey === " ";

      if (pressedKey === "Backspace") {
        deleteLetter(pressedKey);
      } else if (isSpace && !isFirstLetter) {
        updateCurrentWord(e);
      } else if (!atEnd && !isSpace) {
        setLetterIndex(letterIndex + 1);
      } else if (!isSpace) {
        updateLetters(pressedKey, "add");
      }

      // Checking if right or wrong
      const currentLetter = letters[letterIndex];

      if (currentLetter === pressedKey) {
        updateLettersColor("correct");
      } else {
        updateLettersColor("wrong");
      }
    }

    // Supporting functions
    function deleteLetter(pressedKey: string) {
      if (word.length < letterIndex) {
        updateLetters(pressedKey, "delete");
      } else if (letterIndex > 0) {
        setLetterIndex(letterIndex - 1);
      }
    }

    function updateLetters(pressedKey: string, mode: string) {
      const newLetters = [...letters];

      if (mode === "delete") {
        newLetters.pop();

        setLetterIndex(letterIndex - 1);
      } else if (mode === "add") {
        newLetters[letterIndex] = pressedKey;

        setLetterIndex(letterIndex + 1);
      }

      setLetters(newLetters);
    }

    function updateLettersColor(mode: string) {
      const newLettersColor = [...lettersColor];

      if (mode === "correct") {
        newLettersColor[letterIndex] = "text-text-color";
      } else if (mode === "wrong") {
        newLettersColor[letterIndex] = "text-error-color";
      }

      setLettersColor(newLettersColor);
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
          <span key={i} className={lettersColor[i]}>
            {letter}
          </span>
        ))}
        {letterIndex}
        {letters.length}
      </div>
    );
  },
);

function Caret() {
  return (
    <div className="absolute h-8 w-[.1em] animate-pulse bg-caret-color"></div>
  );
}
