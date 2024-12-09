"use client";

import { useSignUpMutation } from "@/redux/auth/authApiSlice";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const inputsData = [
  { placeholder: "Введите имя", type: "text", name: "username" },
  { placeholder: "Введите email", type: "email", name: "email" },
  { placeholder: "Введите пароль", type: "text", name: "password" },
];

export default function Signup() {
  const router = useRouter();

  const [signUp] = useSignUpMutation();

  const signupHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = Object.fromEntries(new FormData(e.currentTarget));
      const result = await signUp(formData).catch(console.log);
      if (result?.data) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={signupHandler}>
      {inputsData.map((el) => (
        <Input
          key={uuidv4()}
          placeholder={el.placeholder}
          type={el.type}
          name={el.name}
        />
      ))}
      <Button type="submit">Зарегестрироваться</Button>
    </form>
  );
}
