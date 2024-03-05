import React, { FC } from "react";

type WhiteContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const WhiteContainer: FC<WhiteContainerProps> = ({ children, className }) => {
  return (
    <div className={`bg-white p-3 rounded-xl ${className}`}>{children}</div>
  );
};

export default WhiteContainer;
