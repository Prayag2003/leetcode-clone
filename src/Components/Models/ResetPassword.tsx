import { auth } from "@/firebase/firebase";
import React, { useEffect, useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

type ResetPasswordProps = {};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const [email, setEmail] = useState("");
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await sendPasswordResetEmail(email);
    if (success) {
      toast.success("Password reset email sent", {
        position: "top-center",
        autoClose: 4000,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  return (
    <form
      className="space-y-6 px-6 lg:px-9 py-5 sm:pb-6 xl:pb-8 bg-gradient-to-b to-purple-700 from-orange-600"
      onSubmit={handleResetPassword}
    >
      <h3 className="text-xl font-medium text-black">Reset Password</h3>
      <p className="text-sm text-white ">
        Forgotten your password? Enter your e-mail address below, and we&apos;ll
        send you an e-mail allowing you to Reset it.
      </p>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-black"
        >
          Your email
        </label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white-500 border-gray-300 placeholder-gray-500 text-black"
          placeholder="abc123@gmail.com"
        />
      </div>

      <button
        type="submit"
        className={`w-full text-white  focus:border-10 hover:border-white font-medium rounded-lg text-sm px-5 py-2.5 text-center 
            bg-brand-orange hover:bg-brand-orange-s `}
      >
        Reset Password
      </button>
    </form>
  );
};
export default ResetPassword;
