import { auth } from "@/firebase/firebase";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Logout from "../Buttons/Logout";
import { useSetRecoilState } from "recoil";
import { authModelAtom } from "@/atoms/authModelAtoms";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Clock from "../Clock/Clock";

type TopbarProps = {
  problemPage?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
  const [user] = useAuthState(auth);
  const setAuthModelState = useSetRecoilState(authModelAtom);
  return (
    <nav className="relative flex h-[50px] w-full shrink-0 items-center px-20 bg-dark-layer-1 text-dark-gray-7">
      <div
        className={`flex w-full items-center justify-between ${
          !problemPage ? "max-w-[1200px] mx-auto" : ""
        }`}
      >
        <Link href="/" className="h-[22px] flex-1">
          <img src="/logo-full.png" alt="Logo" className="h-full" />
        </Link>

        {problemPage && (
          <div className="flex items-center gap-4 flex-1 justify-center">
            <div className="flex items-center  justify-center  rounded dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer">
              <FaChevronLeft className="text-white" />
            </div>

            <Link
              href="/"
              className="flex items-center  gap-2  font medium max-w-[170px] text-dark-grey-8 cursor-pointer hover:text-brand-orange"
            >
              <div>
                <BsList />
              </div>
              <p>Problems List</p>
            </Link>

            <div className="flex items-center  justify-center  rounded dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer">
              <FaChevronRight className="text-white" />
            </div>
          </div>
        )}
        <div className="flex items-center space-x-7 flex-1 justify-end">
          <div>
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noreferrer"
              className="bg-dark-fill-3 py-1.5 px-3  cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2"
            >
              Premium
            </a>
          </div>

          {problemPage && <Clock/>}
          {!user && (
            <Link
              href="/auth"
              onClick={() => {
                setAuthModelState((prev) => ({
                  ...prev,
                  isOpen: true,
                  type: "login",
                }));
              }}
            >
              <button className="bg-dark-fill-3 py-1 px-4 cursor-pointer rounded ">
                Sign In
              </button>
            </Link>
          )}

          {user && (
            <div className="cursor-pointer group relative px-2">
              <Image
                src="/avatar.png"
                alt="user profile"
                height={35}
                width={35}
              />

              <div
                className="absolute top-12 left-1/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-1.5 rounded shadow-lg z-40 group-hover:scale-100 scale-0 
		            transition-all duration-300 ease-in-out"
              >
                <p className="text-sm">{user.email}</p>
              </div>
            </div>
          )}

          {user && <Logout />}
        </div>
      </div>
    </nav>
  );
};
export default Topbar;
