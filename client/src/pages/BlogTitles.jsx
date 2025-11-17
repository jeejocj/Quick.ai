import React, { useState } from "react";
import { Sparkles, Edit, Hash } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const BlogTitles = () => {
  const categories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ];

  const [selectedCategory, setSelectedCategory] = useState("General");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const prompt = `Genearate a blog title for the keyword ${input} in the category ${selectedCategory}`;

      const { data } = await axios.post(
        "/api/ai/generate-blog-title",
        { prompt },
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
        {/* left col */}
        <form
          onSubmit={onSubmitHandler}
          className="flex-1 min-w-[280px] bg-gray-900/70 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.8)]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-blue-300/80">AI Title Generator</p>
              <h1 className="text-2xl font-semibold">Craft powerful headlines</h1>
            </div>
          </div>

          <p className="mt-8 text-sm font-medium text-gray-300">Keyword</p>
          <input
            type="text"
            className="w-full px-4 py-3 mt-3 rounded-2xl bg-black/40 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            placeholder="The future of artificial intelligence is..."
            onChange={(e) => setInput(e.target.value)}
            required
          />

          <p className="mt-6 text-sm font-medium text-gray-300">Category</p>

          <div className="mt-4 flex gap-3 flex-wrap">
            {categories.map((category, index) => (
              <span
                onClick={() => setSelectedCategory(category)}
                className={`text-xs px-4 py-1.5 rounded-full cursor-pointer border transition-all ${
                  selectedCategory === category
                    ? "bg-blue-500/20 text-blue-200 border-blue-400/40"
                    : "text-gray-400 border-white/10 hover:border-white/30"
                }`}
                key={index}
              >
                {category}
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
              <Hash className="w-5" />
            )}
            Generate title
          </button>
        </form>

        {/* Right col*/}
        <div className="flex-1 min-w-[280px] bg-gray-900/70 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 flex flex-col shadow-[0_20px_80px_-40px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <Hash className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-purple-300/80">Outputs</p>
              <h1 className="text-2xl font-semibold">Generated titles</h1>
            </div>
          </div>

          {!content ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-sm flex flex-col items-center gap-5 text-gray-500">
                <Hash className="w-8 h-8" />
                <p>Enter a topic and click "Generate title" to get started</p>
              </div>
            </div>
          ) : (
            <div className="mt-4 h-full max-h-[520px] overflow-y-auto pr-2 text-sm text-gray-200">
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

export default BlogTitles;
