import React, { useState } from "react";
import { Sparkles, Upload, Scissors } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [object, setObject] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (object.split(" ").length > 1) {
        return toast("Please enter only one object name");
      }

      const formData = new FormData();
      formData.append("image", input);
      formData.append("object", object);

      const { data } = await axios.post(
        "/api/ai/remove-image-object",
        formData,
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
          onSubmit={onSubmitHandler}
          className="flex-1 min-w-[280px] bg-gray-900/70 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.8)]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-pink-200/80">Object Removal</p>
              <h1 className="text-2xl font-semibold">Remove distractions instantly</h1>
            </div>
          </div>

          <p className="mt-8 text-sm font-medium text-gray-300">Upload Image</p>
          <div className="mt-4 p-6 border border-dashed border-white/20 rounded-2xl bg-black/30 text-center">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept="image/*"
              onChange={(e) => setInput(e.target.files[0])}
            />
            <label htmlFor="file-upload" className="cursor-pointer inline-flex flex-col items-center gap-3">
              <Upload className="w-8 h-8 text-gray-300" />
              <div className="text-sm text-gray-300">
                <span className="text-pink-300 underline">Choose File</span>
                {input ? ` ${input.name}` : " No file chosen"}
              </div>
              <p className="text-xs text-gray-500">Supports JPG, PNG, and other image formats</p>
            </label>
          </div>

          <p className="mt-6 text-sm font-medium text-gray-300">Describe object name to remove</p>
          <textarea
            rows={4}
            className="w-full px-4 py-3 mt-3 rounded-2xl bg-black/40 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="e.g., watch or spoon. Only single object name"
            value={object}
            onChange={(e) => setObject(e.target.value)}
          />

          <button
            disabled={loading}
            className="mt-8 w-full flex justify-center items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 py-3 text-sm font-medium tracking-wide shadow-lg shadow-pink-500/20 transition-transform hover:scale-[1.01] disabled:opacity-70"
          >
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent border-white/60 animate-spin"></span>
            ) : (
              <Scissors className="w-5" />
            )}
            Remove Object
          </button>
        </form>

        <div className="flex-1 min-w-[280px] bg-gray-900/70 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 flex flex-col shadow-[0_20px_80px_-40px_rgba(0,0,0,0.8)] max-h-[600px]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-purple-200/80">Output</p>
              <h1 className="text-2xl font-semibold">Processed Image</h1>
            </div>
          </div>
          {!content ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-sm flex flex-col items-center gap-5 text-gray-500 text-center">
                <Scissors className="w-9 h-9" />
                <p>Upload an image and click "Remove Object" to get started</p>
              </div>
            </div>
          ) : (
            <div className="mt-6 flex-1 rounded-xl border border-white/10 bg-black/40 overflow-hidden">
              <img src={content} alt="Processed" className="w-full h-full object-contain" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveObject;