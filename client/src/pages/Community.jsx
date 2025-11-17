import { useUser, useAuth } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { Heart, Image as ImageIcon } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const fetchCreations = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user/get-published-creations", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const imageLikeToggle = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/user/toggle-like-creations",
        { id },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchCreations();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  return (
    <div className="h-full overflow-y-auto p-6 sm:p-10 text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-blue-300/70">Community</p>
            <h1 className="text-3xl font-semibold mt-2">Featured Creations</h1>
            <p className="text-gray-400 mt-2">
              Browse community published images and show appreciation with a like.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <ImageIcon className="w-4 h-4" />
              {creations.length} shared
            </span>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gray-900/50 backdrop-blur-xl p-6 min-h-[60vh]">
          {loading ? (
            <div className="flex justify-center items-center min-h-[320px]">
              <span className="w-12 h-12 rounded-full border-2 border-white/20 border-t-transparent animate-spin"></span>
            </div>
          ) : creations.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[320px] text-gray-500 gap-4">
              <ImageIcon className="w-12 h-12" />
              <p>No public creations yet. Publish an image to inspire others.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {creations.map((creation, index) => (
                <div
                  key={creation._id || index}
                  className="relative group rounded-2xl overflow-hidden border border-white/10 bg-black/30"
                >
                  <img
                    src={creation.content}
                    alt={creation.prompt || "AI creation"}
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    <p className="text-sm text-gray-300 line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {creation.prompt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.3em] text-gray-400">By community</span>
                      <button
                        onClick={() => imageLikeToggle(creation._id)}
                        className={`flex items-center gap-1 text-sm px-3 py-1.5 rounded-full transition-colors ${
                          creation.likes.includes(user?.id)
                            ? "bg-red-500/20 text-red-300"
                            : "bg-white/10 text-white"
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            creation.likes.includes(user?.id)
                              ? "fill-red-500 text-red-400"
                              : ""
                          }`}
                        />
                        {creation.likes.length}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;