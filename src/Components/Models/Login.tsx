import { authModelAtom } from "@/atoms/authModelAtoms";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";

type LoginProps = {};
const Login: React.FC<LoginProps> = () => {
  const setAuthModelState = useSetRecoilState(authModelAtom);

  const handleClick = (type: "login" | "register" | "resetPassword") => {
    setAuthModelState((prevState) => ({
      ...prevState,
      type,
    }));
  };

  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const Router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password)
      return alert("Please fill all the fields");
    try {
      const userData = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!userData) return;
      Router.push("/");
      toast.success(`Welcome to LeetCode`, {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        theme: "dark",
        autoClose: 3000,
      });
    }
  };

  console.log(user, "user");
  useEffect(() => {
    if (error)
      toast.error(error.message, {
        position: "top-center",
        theme: "dark",
        autoClose: 3000,
      });
  }, [error]);

  return (
    <form
      onSubmit={handleLogin}
      className="bg-gradient-to-b  to-purple-700 from-orange-600 shadow-md  px-8 py-6 space-y-6"
    >
      <h3 className="mb-4 text-white text-xl font-medium">
        Sign in to LeetCode
      </h3>

      <div className="mb-4">
        <label
          className="block text-gray-900 text-sm rounded-lg font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
        ></input>
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-900 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          onChange={handleInputChange}
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline mb-5"
          id="password"
          type="password"
          name="password"
          placeholder="*******"
        ></input>
      </div>

      <div className="flex items-center justify-between ">
        <button
          className="bg-orange-500 text-white font-bold w-full py-2 px-4 rounded-lg  focus:blue-ring-400 focus:shadow-outline hover:bg-orange-900 transition duration-500 ease-in-out"
          type="submit"
        >
          {loading ? "Loading..." : "Log In"}
        </button>
      </div>

      <button
        className="flex w-full justify-end hover:text-black"
        onClick={() => handleClick("resetPassword")}
      >
        <a href="#" className="text-sm block hover:underline w-full text-right">
          Forgot Password?
        </a>
      </button>

      <div
        className="text-sm font-medium flex"
        onClick={() => handleClick("register")}
      >
        Not Registered?
        <a href="#" className="text-white hover:underline hover:text-blue-300">
          Create an account
        </a>
      </div>
    </form>
  );
};
export default Login;
