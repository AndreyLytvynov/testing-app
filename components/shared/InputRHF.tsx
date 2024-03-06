import { FC } from "react";

import { UseFormRegisterReturn } from "react-hook-form";

type InputRHFFieldProps = {
  label: string;
  id: string;
  placeholder: string;
  error?: string;
  register: UseFormRegisterReturn;
  rows?: number | undefined;
  className?: string;
  type?: string;
};

const InputRHF: FC<InputRHFFieldProps> = ({
  label,
  id,
  placeholder,
  error,
  register,
  className,
  type = "text",
}) => {
  return (
    <>
      <label className='flex flex-col w-full relative' htmlFor={id}>
        <p className='text-xs text-violet'>{label}</p>
        <input
          className={`p-2 rounded border font-medium text-xs border-grey-2  text-violet outline-violet ${className}`}
          id={id}
          type={type}
          placeholder={placeholder}
          aria-label={label}
          {...register}
        />
        {error && (
          <p className='absolute text-tiny text-red-500 leading-4 -bottom-5'>
            {error}
          </p>
        )}
      </label>
    </>
  );
};

export default InputRHF;
