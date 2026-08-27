import { story } from "@/data/story";
import TimelineEntry from "./TimelineEntry";

export default function Timeline() {
  return (
    <section className="relative px-4 py-20 max-w-4xl mx-auto">
      <h2 className="font-pixel text-lg sm:text-2xl text-center mb-4" style={{ color: "var(--pink-600)" }}>
        QUEST LOG
      </h2>
      <p className="font-pixel text-[9px] sm:text-[10px] text-center mb-16 opacity-70">
        WORLD MAP — OUR STORY SO FAR
      </p>

      <div className="relative">
        {/* dotted pixel path */}
        <div
          className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-1"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, var(--pink-400) 0, var(--pink-400) 8px, transparent 8px, transparent 16px)",
          }}
          aria-hidden
        />

        <div className="flex flex-col gap-16 md:gap-24">
          {story.map((entry, i) => (
            <TimelineEntry key={entry.chapter} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
