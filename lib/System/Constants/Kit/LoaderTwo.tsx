import React from "react";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

const LoaderTwo = ({ className = "", style }: Props) => {
  return <span className={"loader-two " + className} />;
};

export default LoaderTwo;
