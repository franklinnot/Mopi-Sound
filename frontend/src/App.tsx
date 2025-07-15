import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';

function App() {
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');

  return (
    <div className="min-h-screen w-full flex items-center justify-center text-white px-4 bg-[#111111]">
      <div className="w-full max-w-xl flex flex-col items-center space-y-8">

        <img src="/icon.svg" alt="Logo grande" className="w-[210px] drop-shadow-sm mt-5 mb-16" />

        <div className="flex items-center space-x-2 self-start ml-1">
          <img src="/icon.svg" alt="Logo pequeño" className="w-10 drop-shadow-sm" />
          <h3 className="text-base font-semibold tracking-wide text-white">
            MOPI - Music Downloader
          </h3>
        </div>

        {/* Input: Link */}
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="link" className="text-xs font-medium">Link</label>
          <div className="flex gap-1.5">
            <input
              id="link"
              type="text"
              placeholder="https://www.youtube.com/..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="flex-grow px-3 py-2.5 rounded-md bg-[#1F2937] text-white placeholder-gray-400 placeholder:font-medium outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
            />
            <button
              type="button"
              className="bg-white px-3 rounded-md hover:bg-gray-200 transition flex items-center justify-center cursor-pointer"
            >
              <FiArrowRight className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>

        {/* Input: Título */}
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="title" className="text-xs font-medium">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Song title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2.5 rounded-md bg-[#1F2937] text-white placeholder-gray-400 placeholder:font-medium outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
          />
        </div>

        {/* Botón final */}
        <button
          type="button"
          className="w-full py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition cursor-pointer text-xs"
        >
          Continue to Download
        </button>
      </div>
    </div>
  );
}

export default App;
