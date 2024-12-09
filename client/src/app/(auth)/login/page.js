"use client";

import { useLoginMutation } from "@/redux/auth/authApiSlice";
import { Button, Input } from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import React from "react";

export default function LoginPage() {
  const router = useRouter();
  const [login] = useLoginMutation();

  const loginHandler = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const result = await login(formData);
    if (result?.data) {
      router.push("/");
    }
  };

  const inputsData = [
    { placeholder: "Введите email", type: "email", name: "email" },
    { placeholder: "Введите пароль", type: "text", name: "password" },
  ];

  return (
    <form onSubmit={loginHandler}>
      {inputsData.map((el) => (
        <Input
          key={uuidv4()}
          placeholder={el.placeholder}
          type={el.type}
          name={el.name}
        />
      ))}
      <Button type="submit">Войти</Button>
    </form>
  );
}
