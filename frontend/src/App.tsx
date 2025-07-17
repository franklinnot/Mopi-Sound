import { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";

function App() {
  const [data, setData] = useState({ link: "", title: "" });
  const [showDetails, setShowDetails] = useState(false);

  const handleNext = () => {
    if (data.link.trim()) {
      setShowDetails(true);
    }
  };

  return (
    <main
      className="min-h-dvh grid place-items-center max-sm:pb-40 
                max-sm:px-8 sm:pb-44 md:pb-48 lg:pb-56"
    >
      <div className="w-full max-w-xl flex flex-col items-center gap-8">
        <img
          className="w-56 hover-glow mb-5"
          src="./icon.svg"
          alt="Logo de MOPI"
        />

        <div className="flex gap-2 self-start items-center">
          <img className="w-8 hover-glow" src="./icon.svg" alt="Logo de MOPI" />
          <h3 className="text-base font-semibold tracking-wide">
            Tu Música, Gratis
          </h3>
        </div>

        <div className="input_div">
          <label htmlFor="link">Link</label>
          <div className="flex gap-1.5">
            <input
              id="link"
              name="link"
              placeholder="https://www.youtube.com/..."
              value={data.link}
              onChange={(e) => setData({ ...data, link: e.target.value })}
              className="flex-grow"
            />
            <button
              type="button"
              onClick={handleNext}
              className="px-3 grid place-items-center"
            >
              <FiRefreshCw className="size-4" />
            </button>
          </div>
        </div>

        {showDetails && (
          <div className="w-full relative">
            <div className="w-full flex flex-col gap-8 animate-fade-in absolute">
              <div className="input_div">
                <label htmlFor="title">Título</label>
                <input
                  id="title"
                  name="title"
                  placeholder="Lipps Inc. - Funkytown"
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                />
              </div>

              <button type="submit" className="w-full mt-2 py-2 transition">
                Descargar
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
