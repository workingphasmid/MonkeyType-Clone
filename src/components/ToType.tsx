"use client";

import { words } from "@/lib/data";

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
  const letters = word.split("");

  return (
    <div className="mx-2 inline-block">
      {letters.map((letter, i) => (
        <span key={i}>{letter}</span>
      ))}
    </div>
  );
}

function Caret() {
  return (
    <div className="absolute h-8 w-[.1em] animate-pulse bg-caret-color"></div>
  );
}
