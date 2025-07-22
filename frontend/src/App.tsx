import { useState, useEffect } from "react"; // Importa useEffect
import { FiRefreshCw } from "react-icons/fi";
// youtube
import getVideoId from "get-video-id";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
// soundcloud
import getFramelyUrl from "./utils/functions/iframely";

function App() {
  const [data, setData] = useState({
    url: "",
    title: "",
    last_url: "",
    processing: false,
    processing_iframe: false,
    id_youtube: "",
    url_framely: "",
  });

  const [showDetails, setShowDetails] = useState(false);
  const [animationState, setAnimationState] = useState(false);

  const handleNext = async () => {
    let newIdYoutube = "";
    let newUrlFramely = "";
    let isValid = false;

    if (data.url) {
      const video = getVideoId(data.url);

      if (video.id && video.service == "youtube") {
        newIdYoutube = video.id;
        newUrlFramely = "";
        isValid = true;
      } else {
        const framelyUrl = await getFramelyUrl(data.url);
        if (framelyUrl) {
          newUrlFramely = framelyUrl;
          newIdYoutube = "";
          isValid = true;
        }
      }
    }

    setData({
      ...data,
      last_url: isValid ? data.url : data.last_url,
      id_youtube: newIdYoutube,
      url_framely: newUrlFramely,
    });

    if (isValid !== showDetails) {
      setAnimationState(true);
    }
    setShowDetails(isValid);
  };

  // manejar el overflow del body
  useEffect(() => {
    if (animationState) {
      document.body.style.overflowY = "hidden";
      const animationDuration = 300;

      const timer = setTimeout(() => {
        document.body.style.overflowY = "";
        setAnimationState(false);
      }, animationDuration);

      return () => clearTimeout(timer);
    }
  }, [animationState]);

  return (
    <main
      className={`min-h-dvh grid place-items-center max-sm:px-8
                py-12 transition-all duration-300 ease-in-out ${
                  !showDetails && "max-sm:pb-40 sm:pb-44 md:pb-48 lg:pb-60"
                }`}
    >
      <div className="w-full max-w-xl flex flex-col items-center gap-8">
        {/* logo */}
        <img
          className={`max-sm:hidden hover-glow mb-6 ${
            showDetails ? "w-44" : "w-56"
          }`}
          src="./icon.svg"
          alt="Logo de MOPI"
        />

        {/* frase - saludo */}
        <div className="flex gap-2 items-center max-sm:mb-4 sm:self-start">
          <img className="w-8 hover-glow" src="./icon.svg" alt="Logo de MOPI" />
          <h3 className="text-base font-semibold tracking-wide">
            Tu Música, Gratis
          </h3>
        </div>

        {/* input-url */}
        <div className="input_div">
          <label htmlFor="link">Link</label>
          <div className="flex gap-1.5">
            <input
              id="link"
              name="link"
              placeholder="https://www.youtube.com/..."
              value={data.url}
              onChange={(e) => {
                setData({ ...data, url: e.target.value.trim() });
              }}
              className="flex-grow"
            />
            <button
              type="button"
              onClick={handleNext}
              className="px-3 grid place-items-center"
              disabled={data.url == data.last_url && data.url == ""}
            >
              <FiRefreshCw className="size-4" />
            </button>
          </div>
        </div>

        {showDetails && (data.id_youtube || data.url_framely) && (
          <div className="w-full flex flex-col gap-8 animate-fade-in">
            {/* input-title */}
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

            {/* iframe - youtube */}
            {data.id_youtube && (
              <LiteYouTubeEmbed id={data.id_youtube} title="" />
            )}

            {/* iframe - soundcloud */}
            {data.url_framely && (
              <div className="soundcloud-container">
                <iframe
                  src={data.url_framely}
                  className="absolute top-0 left-0 w-full h-full border-0"
                  allowFullScreen
                  title="SoundCloud Player"
                />
              </div>
            )}

            {/* submit */}
            <button type="submit" className="w-full mt-2 py-2 transition">
              Descargar
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
