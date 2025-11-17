import React, { useState } from "react";
import Markdown from "react-markdown";

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="p-5 w-full text-sm bg-black/50 border border-white/10 rounded-2xl cursor-pointer shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)] hover:border-blue-500/30 transition-colors"
    >
      <div className="flex justify-between items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-white font-medium line-clamp-2">{item.prompt}</h2>
          <p className="text-xs text-gray-400">
            {item.type} • {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>
        <span className="px-4 py-1.5 rounded-full text-xs uppercase tracking-wide bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-blue-100 border border-white/10">
          {item.type}
        </span>
      </div>
      {expanded && (
        <div className="mt-4">
          {item.type == "image" ? (
            <div className="flex justify-center">
              <img
                src={item.content}
                alt="image"
                className="mt-3 w-full max-w-[360px] rounded-xl border border-white/10 object-cover"
              />
            </div>
          ) : (
            <div className="mt-3 max-h-[320px] overflow-y-auto text-sm text-gray-200">
              <div className="reset-tw">
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;
