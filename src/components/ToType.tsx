"use client";

import { words } from "@/lib/data";
import { forwardRef, useRef, useState, KeyboardEvent, useEffect } from "react";

type WordType = {
  word: string;
  wordIndex: number;
  currentWordIndex: number;
  updateCurrentWord: any;
  updateCaretPosition: any;
  ref: React.RefObject<HTMLDivElement>;
};
type CaretType = { caretPosition: { top: number; left: number } };

export default function ToType() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const currentWordRef = useRef<HTMLDivElement>(null);
  const [caretPosition, setCaretPosition] = useState({ top: 0, left: 72 });

  useEffect(() => {
    currentWordRef.current?.focus();
  }, [currentWordIndex]);

  function updateCurrentWord(mode: string) {
    if (mode === "add") {
      setCurrentWordIndex(currentWordIndex + 1);
    } else if (mode === "minus") {
      setCurrentWordIndex(currentWordIndex - 1);
    }
  }

  function updateCaretPosition(letterRef: HTMLSpanElement, mode: string) {
    const letterWidth = Math.round(letterRef?.getBoundingClientRect().width);
    const letterHeight = Math.round(letterRef?.getBoundingClientRect().height);

    if (mode === "add") {
      setCaretPosition({
        ...caretPosition,
        left: caretPosition.left + letterWidth,
      });
    } else if (mode === "minus") {
      setCaretPosition({
        ...caretPosition,
        left: caretPosition.left - letterWidth,
      });
    }
  }

  return (
    <div className="relative px-16 text-2xl">
      <Caret caretPosition={caretPosition} />
      {words.map((word, i) => (
        <Word
          key={i}
          word={word}
          wordIndex={i}
          currentWordIndex={currentWordIndex}
          updateCurrentWord={updateCurrentWord}
          updateCaretPosition={updateCaretPosition}
          ref={currentWordRef}
        />
      ))}
    </div>
  );
}

const Word = forwardRef<HTMLDivElement, WordType>(
  (
    {
      word,
      wordIndex,
      currentWordIndex,
      updateCurrentWord,
      updateCaretPosition,
    },
    ref,
  ) => {
    const [letterIndex, setLetterIndex] = useState(0);
    const [letters, setLetters] = useState(word.split(""));
    const [lettersColor, setLettersColor] = useState(Array<string>);

    const letterRef = useRef<HTMLSpanElement>(null);

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
      const isFirstWord = wordIndex === 0;

      if (pressedKey === "Backspace") {
        if (isFirstLetter && !isFirstWord) {
          updateCurrentWord("minus");
        } else {
          deleteLetter(pressedKey);
        }
      } else if (isSpace && !isFirstLetter) {
        updateCurrentWord("add");
      } else if (!atEnd && !isSpace) {
        setLetterIndex(letterIndex + 1);
        updateCaretPosition(letterRef.current, "add");
        checkLetter(pressedKey);
      } else if (!isSpace) {
        updateLetters(pressedKey, "add");
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

      const newLettersColor = [...lettersColor];
      newLettersColor.pop();

      setLettersColor(newLettersColor);
    }

    function updateLetters(pressedKey: string, mode: string) {
      const newLetters = [...letters];

      if (mode === "delete") {
        newLetters.pop();

        setLetterIndex(letterIndex - 1);
      } else if (mode === "add") {
        if (newLetters.length === 20) return;

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
      } else if (mode === "default") {
        newLettersColor[letterIndex] = "text-sub-color";
      }

      setLettersColor(newLettersColor);
    }

    function checkLetter(pressedKey: string) {
      const currentLetter = letters[letterIndex];

      if (currentLetter === pressedKey) {
        updateLettersColor("correct");
      } else {
        updateLettersColor("wrong");
      }
    }

    const isCurrentWord = wordIndex === currentWordIndex;
    const isFirstWord = wordIndex === 0;
    return (
      <div
        className="mx-2 inline-block"
        onKeyDown={(e) => handleKeydown(e)}
        ref={currentWordIndex === wordIndex ? ref : null}
        tabIndex={isCurrentWord ? 0 : undefined}
        autoFocus={isFirstWord}
      >
        {letters.map((letter, i) => (
          <span key={i} className={lettersColor[i]} ref={letterRef}>
            {letter}
          </span>
        ))}
      </div>
    );
  },
);

function Caret({ caretPosition }: CaretType) {
  const caretStyle = { top: "", left: "" };

  caretStyle.top = caretPosition.top / 16 + "rem";
  caretStyle.left = caretPosition.left / 16 + "rem";

  return (
    <div
      className="absolute h-8 w-[.1em] animate-pulse bg-caret-color transition-all duration-75"
      style={caretStyle}
    ></div>
  );
}
