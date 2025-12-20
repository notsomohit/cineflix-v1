import React from "react";

const FeaturePopup = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-[90%] max-w-md text-center shadow-2xl"
      >
        <h2 className="text-2xl font-semibold text-white mb-2">
          Feature Coming Soon
        </h2>

        <p className="text-sm text-white/70 mb-6">
          Sign up and authentication will be available in a future update.
        </p>

        <button
          onClick={onClose}
          className="px-5 py-2 rounded-lg bg-white/15 hover:bg-white/25 transition text-white text-sm"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default FeaturePopup;
