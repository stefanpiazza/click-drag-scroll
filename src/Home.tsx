import { useRef } from "react";

export default function Home() {
  const listRef = useRef<HTMLUListElement>(null);

  let isDown: boolean = false;
  let startX: number;
  let scrollLeft: number;

  return (
    <div className="absolute grid h-full w-full content-center justify-center gap-4 p-4">
      <ul
        ref={listRef}
        className={
          "grid w-full snap-x auto-cols-[75%] grid-flow-col gap-4 overflow-auto scroll-smooth rounded-3xl border border-slate-200 p-4 scrollbar-hide"
        }
        onMouseDown={(e) => {
          isDown = true;

          const { current } = listRef;

          if (!current) return;

          current.classList.remove("snap-x");
          current.classList.remove("scroll-smooth");

          startX = e.pageX - current.offsetLeft;
          scrollLeft = current.scrollLeft;
        }}
        onMouseLeave={() => {
          isDown = false;

          const { current } = listRef;

          if (!current) return;
          current.classList.add("snap-x");
          current.classList.add("scroll-smooth");
        }}
        onMouseUp={() => {
          isDown = false;

          const { current } = listRef;

          if (!current) return;
          current.classList.add("snap-x");
          current.classList.add("scroll-smooth");
        }}
        onMouseMove={(e) => {
          if (!isDown) return;

          const { current } = listRef;

          if (!current) return;

          const x = e.pageX - current.offsetLeft;
          const walk = x - startX;

          current.scrollLeft = scrollLeft - walk;
        }}
      >
        {[...Array(9).keys()].map((i) => (
          <li className="snap-center" key={i}>
            <a
              className="flex justify-center rounded-2xl bg-slate-200 px-6 py-4 text-slate-900"
              href={`/${i}`}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onClick={(e) => {
                const { current } = listRef;

                if (!current) return;

                if (current.scrollLeft !== scrollLeft) {
                  e.preventDefault();
                }
              }}
            >
              {i}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex justify-center gap-4">
        <button
          className="flex rounded-3xl border border-slate-200 px-6 py-4 text-slate-900"
          onClick={() => {
            const { current } = listRef;

            if (!current) return;

            if (current.scrollLeft === 0) return;

            current.scrollLeft -= current.offsetWidth * 0.75;
          }}
        >
          Previous
        </button>
        <button
          className="flex rounded-3xl border border-slate-200 px-6 py-4 text-slate-900"
          onClick={() => {
            const { current } = listRef;

            if (!current) return;

            if (current.scrollLeft + current.offsetWidth > current.scrollWidth)
              return;

            current.scrollLeft += current.offsetWidth * 0.75;
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
