import { useState } from "react";
import { Sparkles, Upload, FileText } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (!file) {
        toast.error("Please select a resume file");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('resume', file);

      const { data } = await axios.post("/api/ai/resume-review", formData, {
        headers: { 
          Authorization: `Bearer ${await getToken()}`,
        },
      });

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
          onSubmit={onSubmitHandler}
          className="flex-1 min-w-[280px] bg-gray-900/70 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.8)]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-blue-300/80">Resume Review</p>
              <h1 className="text-2xl font-semibold">Instant professional insights</h1>
            </div>
          </div>

          <p className="mt-8 text-sm font-medium text-gray-300">Upload Resume</p>

          <div className="mt-4 p-6 border border-dashed border-white/20 rounded-2xl bg-black/30 text-center">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <label htmlFor="file-upload" className="cursor-pointer inline-flex flex-col items-center gap-3">
              <Upload className="w-8 h-8 text-gray-300" />
              <div className="text-sm text-gray-300">
                <span className="text-blue-400 underline">Choose File</span>
                {file ? ` ${file.name}` : " No file chosen"}
              </div>
              <p className="text-xs text-gray-500">Supports PDF resume only</p>
            </label>
          </div>

          <button
            disabled={loading}
            className="mt-8 w-full flex justify-center items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 py-3 text-sm font-medium tracking-wide shadow-lg shadow-blue-500/20 transition-transform hover:scale-[1.01] disabled:opacity-70"
          >
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent border-white/60 animate-spin"></span>
            ) : (
              <FileText className="w-5" />
            )}
            Review Resume
          </button>
        </form>

        <div className="flex-1 min-w-[280px] bg-gray-900/70 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 flex flex-col shadow-[0_20px_80px_-40px_rgba(0,0,0,0.8)] max-h-[600px]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-purple-200/80">Results</p>
              <h1 className="text-2xl font-semibold">Analysis summary</h1>
            </div>
          </div>
          {!content ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-sm flex flex-col items-center gap-5 text-gray-500 text-center">
                <FileText className="w-9 h-9" />
                <p>Upload a resume and click "Review Resume" to get started</p>
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

export default ReviewResume;