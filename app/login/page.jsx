"use client";
import PrimaryButtonComponent from "@/components/inputs/primary-btn.component";
import TextInputComponent from "@/components/inputs/textinputcomponent";
import { loginUser } from "@/utils/admin-apis";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(true);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("clicked : ", data);
    setIsLoading(true);
    try {
      const res = await loginUser(data);
      if (res) {
        console.log("Login Successfull");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setError("Invalid username or password");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex  min-h-screen justify-center flex-col w-full">
      <div className="space-y-8">
        <h1 className="text-3xl font-semibold text-center">
          Venue Admin Login
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <TextInputComponent
            type="text"
            label="Username"
            isLabelVisible={false}
            name="username"
            register={register}
            errors={errors}
            placeholder="Username"
            required
          />
          <TextInputComponent
            type="password"
            name="password"
            label="Password"
            isLabelVisible={false}
            register={register}
            errors={errors}
            placeholder="Password"
            required
          />
          <PrimaryButtonComponent
            type={"submit"}
            text="Sign in"
            isLoading={isLoading}
          />
        </form>
        {error && (
          <h1 className="text-red-500 text-xs text-center -translate-y-5">
            {error}
          </h1>
        )}
        <h1 className="text-gray-400 text-sm text-center -translate-y-5">
          New Registration ?
        </h1>
      </div>
    </div>
  );
};

export default LoginPage;
