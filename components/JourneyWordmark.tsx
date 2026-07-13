const BODY_LETTERS = [
  { id: "o", aspect: "280 / 278" },
  { id: "u", aspect: "256 / 278" },
  { id: "r", aspect: "141 / 278" },
  { id: "n", aspect: "255 / 278" },
  { id: "e", aspect: "256 / 272" },
  { id: "y", aspect: "255 / 278" },
] as const;

const GAP = "gap-[clamp(4px,1.5vw,16px)]";
const J_HEIGHT = "h-[min(28vh,18vw)] sm:h-[min(34vh,20vw)]";
const BODY_HEIGHT = "h-[min(22vh,14vw)] sm:h-[min(26vh,16vw)]";

export default function JourneyWordmark() {
  return (
    <>
      {/*
        Figma: mix-blend-mode: exclusion on the letter row.
        Keep this node free of transform / overflow / z-index, and keep
        ancestors free of stacking contexts (see page.tsx hero section),
        or the blend won’t reach the DotWalkers canvas behind it.
      */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 flex w-full justify-center px-2 pb-2 sm:px-4 sm:pb-4 mix-blend-exclusion`}
      >
        <div
          className={`flex w-full max-w-[1400px] items-end justify-center ${GAP}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/journey/letter_logo/j.svg"
            alt="J"
            className={`${J_HEIGHT} w-auto object-contain object-bottom`}
          />
          {BODY_LETTERS.map((letter) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={letter.id}
              src={`/images/journey/letter_logo/${letter.id}.svg`}
              alt={letter.id.toUpperCase()}
              className={`${BODY_HEIGHT} w-auto object-contain object-bottom`}
            />
          ))}
        </div>
      </div>

      {/*
        Same geometry as the letter row (J + body widths) so justify-center
        lines up. Copy sits at the top of the J, above o–y.
      */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex w-full justify-center px-2 pb-2 sm:px-4 sm:pb-4">
        <div
          className={`flex w-full max-w-[1400px] items-end justify-center ${GAP}`}
        >
          <div
            className={`${J_HEIGHT} shrink-0`}
            style={{ aspectRatio: "213 / 368" }}
            aria-hidden
          />

          <div className={`flex ${J_HEIGHT} flex-col`}>
            <p className="type-tagline -mt-1 text-left text-white sm:-mt-1.5">
              <span className="block whitespace-nowrap">
                Every idea starts with a step.
              </span>
              <span className="block whitespace-nowrap">
                We design and build digital products from idea to launch.
              </span>
            </p>

            <div
              className={`mt-auto flex items-end ${GAP} opacity-0`}
              aria-hidden
            >
              {BODY_LETTERS.map((letter) => (
                <div
                  key={letter.id}
                  className={`${BODY_HEIGHT}`}
                  style={{ aspectRatio: letter.aspect }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
