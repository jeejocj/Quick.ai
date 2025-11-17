import React, { useState } from "react";
import { Sparkles, Image as ImageIcon } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const ImageStyle = [
    "Realistic",
    "Ghibli style",
    "Anime style",
    "Cartoon style",
    "Fantasy style",
    "Realistic style",
    "3D style",
    "Portrait style",
  ];

  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const prompt = `Genearate an image of ${input} in the style ${selectedStyle}`;

      const { data } = await axios.post(
        "/api/ai/generate-image",
        { prompt, publish },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (!data.succes) {
         setLoading(false);
        return toast.error("This feature is under progress");
       
      }
       

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  const isImageOutput =
    typeof content === "string" &&
    (content.startsWith("http") || content.startsWith("data:image"));

  return (
    <div className="h-full overflow-y-auto p-6 sm:p-10 text-white">
      <div className="max-w-6xl mx-auto flex flex-wrap gap-6">
        <form
          onSubmit={onSubmitHandler}
          className="flex-1 min-w-[280px] bg-gray-900/70 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.8)]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-emerald-300/80">AI Image Generator</p>
              <h1 className="text-2xl font-semibold">Visualize your idea</h1>
            </div>
          </div>

          <p className="mt-8 text-sm font-medium text-gray-300">Describe Your Image</p>
          <textarea
            rows={4}
            className="w-full px-4 py-3 mt-3 rounded-2xl bg-black/40 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Describe what you want to see in the image..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />

          <p className="mt-6 text-sm font-medium text-gray-300">Style</p>

          <div className="mt-4 flex gap-3 flex-wrap">
            {ImageStyle.map((style, index) => (
              <span
                onClick={() => setSelectedStyle(style)}
                className={`text-xs px-4 py-1.5 rounded-full cursor-pointer border transition-all ${
                  selectedStyle === style
                    ? "bg-emerald-500/20 text-emerald-200 border-emerald-400/40"
                    : "text-gray-400 border-white/10 hover:border-white/30"
                }`}
                key={index}
              >
                {style}
              </span>
            ))}
          </div>

          <div className="my-8 flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                onChange={(e) => setPublish(e.target.checked)}
                checked={publish}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:bg-emerald-500 transition-all"></div>
              <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></span>
            </label>
            <p className="text-sm text-gray-300">Make this image Public</p>
          </div>

          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 py-3 text-sm font-medium tracking-wide shadow-lg shadow-emerald-500/20 transition-transform hover:scale-[1.01] disabled:opacity-70"
          >
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent border-white/60 animate-spin"></span>
            ) : (
              <ImageIcon className="w-5" />
            )}
            Generate Image
          </button>
        </form>

        <div className="flex-1 min-w-[280px] bg-gray-900/70 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 flex flex-col shadow-[0_20px_80px_-40px_rgba(0,0,0,0.8)] max-h-[600px]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-blue-300/80">Outputs</p>
              <h1 className="text-2xl font-semibold">Generated image</h1>
            </div>
          </div>

          {!content ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-sm flex flex-col items-center gap-5 text-gray-500">
                <ImageIcon className="w-9 h-9" />
                <p>Describe an idea and click "Generate Image" to get started</p>
              </div>
            </div>
          ) : isImageOutput ? (
            <div className="mt-6 flex-1 rounded-xl border border-white/10 bg-black/40 overflow-hidden">
              <img src={content} alt="Generated" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="mt-4 h-full overflow-y-auto text-sm text-gray-200 pr-2">
              <div className="reset-tw">
                <Markdown>{content}</Markdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GenerateImages;
