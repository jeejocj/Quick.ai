import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import {
  Hash,
  House,
  SquarePen,
  Image,
  Eraser,
  Scissors,
  FileText,
  Users,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-images", label: "Generate Images", Icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <div
      className={`w-64 bg-black/60 backdrop-blur-2xl border-r border-white/10 flex flex-col justify-between items-stretch max-sm:absolute top-16 bottom-0 z-40 ${
        sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="px-5 pt-8 pb-4 overflow-y-auto">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500/40 to-purple-500/40 flex items-center justify-center border border-white/10">
            <img
              src={user.imageUrl}
              alt="User avatar"
              className="w-16 h-16 rounded-2xl object-cover"
            />
          </div>
          <h1 className="mt-4 text-base font-semibold text-white">{user.fullName}</h1>
          <p className="text-xs text-gray-400">Welcome back</p>
        </div>

        <div className="space-y-2">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 border border-transparent ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-white/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/10"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-4 h-4 transition-transform ${
                      isActive ? "text-white" : "text-gray-500 group-hover:text-white"
                    }`}
                  />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="px-5 py-5 border-t border-white/10 bg-black/40 flex items-center justify-between">
        <button
          onClick={openUserProfile}
          className="flex items-center gap-3 text-left text-white/90 hover:text-white"
        >
          <img src={user.imageUrl} className="w-10 h-10 rounded-2xl object-cover" alt="" />
          <div>
            <p className="text-sm font-semibold">{user.fullName}</p>
            <p className="text-xs text-gray-400">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>{" "}
              Plan
            </p>
          </div>
        </button>
        <button
          onClick={signOut}
          className="p-2 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/40 transition"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
