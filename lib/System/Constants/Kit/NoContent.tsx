import React from "react";

export interface Props {
  label: string;
}

const NoContent = ({ label = "no_content" }: Props) => {
  return (
    <div>
      <div className="flex col-span-full col items-center justify-center m-auto">
        {/* <Lottie className="max-w-xl" animationData={noData} /> */}
        <p className="font-bold text-2x text-owl py-6x">{label}</p>
      </div>
    </div>
  );
};

export default React.memo(NoContent);
