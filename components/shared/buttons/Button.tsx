import { FC, MouseEventHandler } from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({
  children,
  className,
  type = "button",
  onClick,
  disabled,
}) => {
  return (
    <button
      className={`flex gap-2 justify-center items-center border border-violet text-violet py-2 rounded hover:bg-violet hover:text-white p-2 cursor-pointer duration-200 focus:outline-violet ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
