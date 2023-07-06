import { auth } from "@/firebase/firebase";
import { redirect } from "next/dist/server/api-utils";
import React from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";

type LogoutProps = {};

const Logout: React.FC<LogoutProps> = () => {
  const [signOut, loading, error] = useSignOut(auth);
  const [user] = useAuthState(auth);
  const handleLogout = async () => {
    try {
      await signOut();
      toast.success(`Logged out successfully`, {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
    }
  };
  return (
    <button
      className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange"
      onClick={handleLogout}
    >
      <FiLogOut />
    </button>
  );
};
export default Logout;
