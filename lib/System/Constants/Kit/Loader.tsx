import React from "react";

type Props = {
  // className?: string;
  // style?: React.CSSProperties;
  variant?: "v-small" | "small" | "medium" | "large";
};

// const Loader = ({ className = "loader-container", style }: Props) => {
//   return (
//     <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 500 500">
//       <path
//         fill="none"
//         stroke="#DA3746"
//         strokeWidth="46"
//         className="squiggle"
//         d="M111.6,344.3h217.2c33.8-2.5,61.2-29.9,61.2-63.7V88.8c0-33.9-27.5-61.4-61.4-61.4H87.3c-33.8,0-61.1,27.4-61.1,61.1l0.6,238.7c0.1,34.6,28.3,62.5,63.1,62.5h67.8"
//       />
//       <path
//         fill="none"
//         stroke="#DA374655"
//         strokeWidth="47"
//         className="squiggle-2"
//         d="M111.6,344.3h217.2c33.8-2.5,61.2-29.9,61.2-63.7V88.8c0-33.9-27.5-61.4-61.4-61.4H87.3c-33.8,0-61.1,27.4-61.1,61.1l0.6,238.7c0.1,34.6,28.3,62.5,63.1,62.5h67.8"
//       />
//     </svg>
//   );
// };

const Loader = ({ variant = "medium" }: Props) => {
  return <span className={"loader " + variant} />;
};

export default Loader;
