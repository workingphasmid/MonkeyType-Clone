"use client";

import { words } from "@/lib/data";
import { forwardRef, useRef, useState, KeyboardEvent, useEffect } from "react";

type WordType = {
  word: string;
  wordIndex: number;
  currentWordIndex: number;
  updateCurrentWord: any;
  setIsTyping: any;
  isTyping: boolean;
  wordsStyle: Array<{}>;
  handleWordsStyle: any;
  ref: React.RefObject<HTMLDivElement>;
};

export default function ToType() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [wordsStyle, setWordsStyle] = useState<any>([{ position: "relative" }]);

  const currentWordRef = useRef<HTMLDivElement>(null);

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

  function handleWordsStyle() {
    const newWordsStyle = [...wordsStyle];
    newWordsStyle[currentWordIndex] = {
      textDecorationLine: "underline",
    };
    newWordsStyle[currentWordIndex + 1] = {
      position: "relative",
    };

    setWordsStyle(newWordsStyle);
  }

  return (
    <div className="px-16 text-2xl">
      {words.map((word, i) => (
        <Word
          key={i}
          word={word}
          wordIndex={i}
          currentWordIndex={currentWordIndex}
          updateCurrentWord={updateCurrentWord}
          setIsTyping={setIsTyping}
          isTyping={isTyping}
          handleWordsStyle={handleWordsStyle}
          wordsStyle={wordsStyle}
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
      setIsTyping,
      isTyping,
      handleWordsStyle,
      wordsStyle,
    },
    ref,
  ) => {
    const [letterIndex, setLetterIndex] = useState(0);
    const [letters, setLetters] = useState(word.split(""));
    const [lettersColor, setLettersColor] = useState(Array<string>);

    const letterRef = useRef<HTMLSpanElement>(null);
    const letterWidth = letterRef.current?.getBoundingClientRect().width;

    function handleKeydown(e: KeyboardEvent) {
      const atEnd = letters.length === letterIndex;
      const pressedKey = e.key;
      const pattern = /^[\s\w'",.?!;:@#$%&()]$/;

      // Wall: Ending the key if its not valid
      if (!pattern.test(pressedKey) && pressedKey !== "Backspace") {
        return;
      }

      setIsTyping(true);

      // Updating the word and letter indexes
      const isFirstLetter = letterIndex === 0;
      const isSpace = pressedKey === " ";
      const isFirstWord = wordIndex === 0;

      if (pressedKey === "Backspace") {
        if (isFirstLetter && !isFirstWord) {
          updateCurrentWord("minus");
        }

        deleteLetter(pressedKey);
      } else if (isSpace && !isFirstLetter) {
        const newWord = letters.slice(0, letterIndex).join("");
        console.log(newWord);
        console.log(word);

        if (word !== newWord) {
          handleWordsStyle();
        }

        updateCurrentWord("add");
      } else if (!atEnd && !isSpace) {
        setLetterIndex(letterIndex + 1);
        checkLetter(pressedKey);
      } else if (!isSpace && letters.length !== 20) {
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

      updateLettersColor("delete");
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
      } else if (mode === "default") {
        newLettersColor[letterIndex] = "text-sub-color";
      } else if (mode === "delete") {
        newLettersColor.pop();
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
    const newWordsStyle = [...wordsStyle];
    if (isCurrentWord) {
      newWordsStyle[currentWordIndex] = {
        position: "relative",
      };
    }

    return (
      <div
        className="mx-2 inline-block decoration-error-color underline-offset-4"
        style={newWordsStyle[wordIndex]}
        onKeyDown={(e) => handleKeydown(e)}
        ref={currentWordIndex === wordIndex ? ref : null}
        tabIndex={isCurrentWord ? 0 : undefined}
        autoFocus={isFirstWord}
      >
        {isCurrentWord && (
          <Caret
            letterIndex={letterIndex}
            letterWidth={letterWidth}
            isTyping={isTyping}
          />
        )}
        {letters.map((letter, i) => (
          <span
            key={i}
            className={lettersColor[i]}
            ref={i === 0 ? letterRef : null}
          >
            {letter}
          </span>
        ))}
      </div>
    );
  },
);

function Caret({
  letterIndex,
  letterWidth,
  isTyping,
}: {
  letterIndex: number;
  letterWidth: any;
  isTyping: boolean;
}) {
  const leftPosition = letterWidth ? Math.round(letterIndex * letterWidth) : 0;
  const animationName = isTyping ? "none" : "";

  return (
    <div
      className="absolute h-8 w-[2.2px] animate-pulse bg-caret-color transition-all duration-75"
      style={{ left: leftPosition, animationName: animationName }}
    ></div>
  );
}
