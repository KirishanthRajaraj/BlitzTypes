import React from "react";

const BouncingDotsLoader = ({className = ''}) => {
  return (
    <>
      <div className={`bouncing-loader ${className} absolute inset-0 flex items-center justify-center`}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default BouncingDotsLoader;
