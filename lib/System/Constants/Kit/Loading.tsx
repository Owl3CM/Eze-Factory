import React from "react";
import Loader from "./Loader";

const Loading = () => {
  return (
    <div
      className="sticky bottom:50% flex col-span-full col items-center justify-center m-auto round-lg p-lg"
      style={{
        backgroundColor: "rgba(var(--rgb-prim), 0.92)",
      }}>
      <div className="col-center m-auto">
        <Loader />
      </div>
    </div>
  );
};

export default Loading;
