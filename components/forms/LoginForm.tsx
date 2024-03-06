"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { logIn } from "@/lib/actions/auth.actions";

import InputRHF from "../shared/InputRHF";
import Button from "../shared/buttons/Button";
import { PropagateLoader } from "react-spinners";

type TypeFormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeFormValues>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      await logIn(data);
      router.push("/");
    } catch (error: any) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-8 w-[600px] p-5'>
      <InputRHF
        label={"email"}
        id='email'
        placeholder={"email"}
        register={register("email", {
          required: "Email is required",
          maxLength: {
            value: 70,
            message: "Email is too long",
          },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        })}
        error={errors?.email?.message}
      />
      <InputRHF
        label={"password"}
        id='password'
        type='password'
        placeholder={"password"}
        register={register("password", {
          required: "Password is required",
          minLength: {
            value: 4,
            message: "Password must be at least 4 characters long",
          },
          maxLength: {
            value: 30,
            message: "Password is too long",
          },
        })}
        error={errors?.password?.message}
      />
      {isLoading ? (
        <PropagateLoader color='#4D44B5' className='mx-auto h-[42px]' />
      ) : (
        <Button className='w-[200px] mx-auto' type='submit'>
          Login
        </Button>
      )}

      {error ? <p className='text-red-500 text-center'>{error}</p> : <></>}
    </form>
  );
};

export default LoginForm;
