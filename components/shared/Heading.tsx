import React, { FC } from "react";

type HeadingProps = {
  children: React.ReactNode;
  className?: string;
};

const Heading: FC<HeadingProps> = ({ children, className }) => {
  return (
    <h1 className={` text-violet text-xl font-bold mb-5 ${className}`}>
      {children}
    </h1>
  );
};

export default Heading;
