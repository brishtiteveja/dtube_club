import React from "react";

function Feed({ posts }) {
  return (
    <div className="flex-grow h-screen pb-44 pt-6 mr-4 xl:mr-40 overflow-y-auto scrollbar-hide">
      <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
        <h1 className="text-3xl font-black underline">
          Hello world!
        </h1>
      </div>
    </div>
  );
}

export default Feed;
