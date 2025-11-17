import { Edit, Sparkles } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: "Short (500-800 words)" },
    { length: 1200, text: "Medium (800-1200 words)" },
    { length: 1600, text: "Long (1200+ words)" },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Write an article about ${input} in ${selectedLength.text}`;

      const { data } = await axios.post(
        "/api/ai/generate-article",
        { prompt, length: selectedLength.length },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );
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

  return (
    <div className="h-full overflow-y-auto p-6 sm:p-10 text-white">
      <div className="max-w-6xl mx-auto flex flex-wrap gap-6">
        <form
          onSubmit={onSubitHandler}
          className="flex-1 min-w-[280px] bg-gray-900/70 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.8)]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-blue-300/80">Article Configuration</p>
              <h1 className="text-2xl font-semibold">Fine-tune your brief</h1>
            </div>
          </div>

          <p className="mt-8 text-sm font-medium text-gray-300">Article Topic</p>
          <input
            type="text"
            className="w-full px-4 py-3 mt-3 rounded-2xl bg-black/40 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="The future of artificial intelligence is..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />

          <p className="mt-6 text-sm font-medium text-gray-300">Article Length</p>

          <div className="mt-4 flex gap-3 flex-wrap">
            {articleLength.map((item, index) => (
              <span
                onClick={() => setSelectedLength(item)}
                className={`text-xs px-4 py-1.5 rounded-full cursor-pointer border transition-all ${
                  selectedLength.text === item.text
                    ? "bg-purple-500/20 text-purple-200 border-purple-400/40"
                    : "text-gray-400 border-white/10 hover:border-white/30"
                }`}
                key={index}
              >
                {item.text}
              </span>
            ))}
          </div>

          <button
            disabled={loading}
            className="mt-8 w-full flex justify-center items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 py-3 text-sm font-medium tracking-wide shadow-lg shadow-blue-500/20 transition-transform hover:scale-[1.01] disabled:opacity-70"
          >
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent border-white/60 animate-spin"></span>
            ) : (
              <Edit className="w-5" />
            )}
            Generate article
          </button>
        </form>

        <div className="flex-1 min-w-[280px] bg-gray-900/70 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 flex flex-col shadow-[0_20px_80px_-40px_rgba(0,0,0,0.8)] max-h-[600px]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <Edit className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-cyan-300/80">Outputs</p>
              <h1 className="text-2xl font-semibold">Generated article</h1>
            </div>
          </div>
          {!content ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-sm flex flex-col items-center gap-5 text-gray-500">
                <Edit className="w-9 h-9" />
                <p>Enter a topic and click "Generate article" to get started</p>
              </div>
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
};

export default WriteArticle;
