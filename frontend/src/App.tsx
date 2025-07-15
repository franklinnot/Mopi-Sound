import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

function Logo({ width = "100%", height = "auto" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1088 686"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_12_48)">
        <path
          d="M1084 645.697C1084 418.695 752.442 191.692 543.999 191.692C335.557 191.692 4 413.65 4 645.697C4 852.335 335.557 2.00264e-05 543.999 2.00264e-05C752.442 2.00264e-05 1084 852.335 1084 645.697Z"
          fill="#FAFAFA"
          className="mix-blend-mode:hard-light"
          shape-rendering="geometricPrecision"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_12_48"
          x="0"
          y="0"
          width="1088"
          height="686"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_12_48"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_12_48"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

function App() {
  const [data, setData] = useState({
    link: "",
    title: "",
  });

  return (
    <main className="min-h-dvh grid place-items-center pb-16 max-sm:px-8">
      <form className="w-full max-w-xl flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="mb-6">
          <Logo width="224px" />
        </div>

        {/* Título */}
        <div className="flex gap-2 self-start">
          <Logo width="40px" />
          <h3 className="text-base font-semibold tracking-wide">
            Tu Música, Gratis
          </h3>
        </div>

        {/* Input: Link */}
        <div id="input_div">
          <label htmlFor="link">Link</label>
          <div className="flex gap-1.5">
            <input
              id="link"
              placeholder="https://www.youtube.com/..."
              value={data.link}
              onChange={(e) => setData({ ...data, link: e.target.value })}
              className="flex-grow"
            />
            <button type="button" className="px-3 grid place-items-center">
              <FiArrowRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Input: Título */}
        <div id="input_div">
          <label htmlFor="title">Título</label>
          <input
            id="title"
            placeholder="Lipps Inc. - Funkytown"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-full"
          />
        </div>

        {/* Botón final */}
        <button
          type="submit"
          className="w-full mt-0.5 py-2 rounded-md border-none
                    outline-none bg-white transition"
        >
          Descargar
        </button>
      </form>
    </main>
  );
}

export default App;
