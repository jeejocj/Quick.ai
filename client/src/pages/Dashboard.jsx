import { useEffect, useState } from "react";
import { Gem, Sparkles } from "lucide-react";
import { Protect } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();

  const getDashboardData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user/get-user-creations", {
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

  useEffect(() => {
    getDashboardData();
  }, []);

  

  return (
    <div className="h-full overflow-y-auto p-6 sm:p-10 text-white">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-gray-900/70 backdrop-blur-xl border border-white/10 flex items-center justify-between shadow-[0_20px_80px_-40px_rgba(0,0,0,0.8)]">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Total Creations</p>
              <h2 className="text-3xl font-semibold mt-3">{creations.length}</h2>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-gray-900/70 backdrop-blur-xl border border-white/10 flex items-center justify-between shadow-[0_20px_80px_-40px_rgba(0,0,0,0.8)]">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Active Plan</p>
              <h2 className="text-3xl font-semibold mt-3">
                <Protect plan={"premium"} fallback="Free">
                  Premium
                </Protect>
              </h2>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
              <Gem className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gray-900/70 border border-white/10 rounded-2xl p-6 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-blue-300/70">Activity</p>
              <h3 className="text-2xl font-semibold mt-3">Recent Creations</h3>
            </div>
            <span className="text-sm text-gray-400">Automatically updated</span>
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-[220px]">
              <span className="w-12 h-12 rounded-full border-2 border-white/20 border-t-transparent animate-spin"></span>
            </div>
          ) : creations.length ? (
            <div className="mt-6 space-y-4">
              {creations.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-white/5 bg-black/40 hover:border-blue-500/30 transition-colors"
                >
                  <CreationItem item={item} />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 min-h-[200px] flex flex-col items-center justify-center text-gray-400 gap-4">
              <Sparkles className="w-10 h-10" />
              <p>No creations yet. Start exploring tools to generate content.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
