import React from "react";

const BouncingDotsLoader = ({className = ''}) => {
  return (
    <>
      <div className={`bouncing-loader ${className}`}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default BouncingDotsLoader;
