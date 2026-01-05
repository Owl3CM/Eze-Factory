import React from "react";
import Loader from "./Loader";

const Searching = () => {
  return (
    <div
      style={{
        zIndex: 3000,
        right: "50vw",
        marginRight: -50,
        top: "50vh",
        marginTop: -50,
      }}
      className="fixed">
      <Loader />
    </div>
  );
};

export default Searching;
