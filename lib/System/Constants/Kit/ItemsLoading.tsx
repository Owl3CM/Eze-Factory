import React from "react";

const ItemsLoading = ({}) => {
  return (
    <div style={{ zIndex: 3000 }} className="col-span-full py-xl col">
      <svg className="m-auto size-40" xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 500 500">
        <path
          fill="none"
          stroke="#DA374633"
          strokeWidth="47"
          className="squiggle-2"
          d="M111.6,344.3h217.2c33.8-2.5,61.2-29.9,61.2-63.7V88.8c0-33.9-27.5-61.4-61.4-61.4H87.3c-33.8,0-61.1,27.4-61.1,61.1l0.6,238.7c0.1,34.6,28.3,62.5,63.1,62.5h67.8"
        />
        <path
          fill="none"
          stroke="#DA3746"
          strokeWidth="46"
          className="squiggle"
          d="M111.6,344.3h217.2c33.8-2.5,61.2-29.9,61.2-63.7V88.8c0-33.9-27.5-61.4-61.4-61.4H87.3c-33.8,0-61.1,27.4-61.1,61.1l0.6,238.7c0.1,34.6,28.3,62.5,63.1,62.5h67.8"
        />
      </svg>
    </div>
  );
  // return (
  //     <div className="p-10 fixed left-0 right-0" style={{ bottom: 60 }}>
  //         <SearchingIcon />
  //     </div>
  // );
};

export default ItemsLoading;
