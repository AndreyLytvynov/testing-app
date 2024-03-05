import React, { FC, KeyboardEvent } from "react";

type InputProps = {
  className?: string;
  name: string;
  placeholder: string;
  type: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  required?: boolean;
  id?: string;
};

const Input: FC<InputProps> = ({
  className,
  name,
  placeholder,
  type,
  onKeyDown,
  required = false,
  id,
}) => {
  return (
    <input
      className={`p-2 rounded border font-medium text-xs border-grey-2  text-violet outline-violet ${className}`}
      type={type}
      placeholder={placeholder}
      name={name}
      onKeyDown={onKeyDown}
      required={required}
      id={id}
    />
  );
};

export default Input;
