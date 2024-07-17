import TestConfig from "@/components/TestConfig";
import TypingArea from "@/components/TypingArea";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center pt-8 text-sub-color">
      <TestConfig />
      <TypingArea />
    </main>
  );
}
