"use client";
import { useLogoutMutation } from "@/redux/auth/authApiSlice";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { user, accessToken } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();
  const logoutHandler = async () => {
    await logout();
  };

  console.log(user, accessToken, '<-----')
  return (
    <nav className="bg-gray-800  p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Главная
        </Link>
        {user && accessToken ? (
          <>
            <span>Здравствуйте, {user.username}!</span>
            <div className="flex space-x-8">
              <Link href="/login" onClick={logoutHandler}>
                Выйти
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="flex">
              <Link href="/signup" className="mr-2">
                Регистрация
              </Link>
              <Link href="/login">Вход</Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
