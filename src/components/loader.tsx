import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center absolute h-full w-full">
      <div
        className="animate-spin inline-block w-12 h-12 border-[4px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
