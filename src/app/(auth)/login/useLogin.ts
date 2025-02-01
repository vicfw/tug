"use client";

import { useLoginMutation } from "@/redux/services/authApi";
import { localStorageSetter } from "@/utils";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormInputs = {
  email: string;
  password: string;
  terms: boolean;
};

export const useLogin = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const [login, { isLoading }] = useLoginMutation();

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async ({ email, password }: FormInputs) => {
    // remove error message before submit if its there
    if (errorMessage) setErrorMessage("");
    try {
      const data = await login({ email, password }).unwrap();
      localStorageSetter("token", data.token);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code.includes("invalid-credential"))
          setErrorMessage("Invalid email or password");

        if (error.code.includes("too-many-requests"))
          setErrorMessage("Too many requests. Try again later.");
      }
    }
  };

  useEffect(() => {
    // Check if user is authenticated, redirect to dashboard
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  return {
    get: { register, isLoading, errors, errorMessage },
    on: { onSubmit, handleSubmit },
  };
};
