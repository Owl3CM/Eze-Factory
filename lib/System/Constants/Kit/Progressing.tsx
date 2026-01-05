import React from "react";
import Loader from "./Loader";

export interface Props {
  label?: string;
  service?: any;
}

const Progressing = ({ label = "processing" }: Props) => {
  return (
    <div className="processing-container">
      <div className="col-center m-auto bg-prim round-md p-3x min-w:200px col justify-center shadow-sm">
        <div className="mx-auto">
          <Loader />
        </div>
        <p className="text-center">{label}</p>
      </div>
    </div>
  );
};

export default Progressing;
