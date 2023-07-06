import { authModelAtom } from "@/atoms/authModelAtoms";
import { auth } from "@/firebase/firebase";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {
  const setAuthModelState = useSetRecoilState(authModelAtom);

  const handleClick = () => {
    setAuthModelState((prevState) => ({
      ...prevState,
      type: "login",
    }));
  };

  const [inputs, setInputs] = useState({ email: "", password: "", name: "" });
  const Router = useRouter();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.name || !inputs.password || !inputs.email)
      return alert("Please fill all the fields");
    if (inputs.password.length < 8 || inputs.password.length > 16)
      return alert("Password must be between 8 to 16 characters");
    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) return;
      Router.push("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (error) alert(error.message);
  }, [error]);

  return (
    <form
      onSubmit={handleRegister}
      className="bg-gradient-to-b to-purple-700 from-orange-600 shadow-md  px-9 py-4 space-y-5"
    >
      <h3 className="mb-3 text-white text-xl font-medium">
        Register to LeetCode
      </h3>

      <div className="mb-2">
        <label
          className="block text-gray-900 text-sm rounded-lg font-bold mb-1"
          htmlFor="name"
        >
          Name
        </label>
        <input
          onChange={handleInput}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="name"
          name="name"
          placeholder="Enter your Name"
        />
      </div>

      <div className="mb-2">
        <label
          className="block text-gray-900 text-sm rounded-lg font-bold mb-1"
          htmlFor="email"
        >
          Email
        </label>
        <input
          onChange={handleInput}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-2">
        <label
          className="block text-gray-900 text-sm font-bold mb-1"
          htmlFor="password"
        >
          Password
        </label>
        <input
          onChange={handleInput}
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline mb-5"
          id="password"
          type="password"
          name="password"
          placeholder="*******"
        ></input>
      </div>

      <button
        className="bg-orange-500 text-white font-bold w-full py-2 px-4 rounded-lg  focus:blue-ring-400 focus:shadow-outline hover:bg-purple-600 transition duration-300 ease-in-out"
        type="submit"
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <div className="text-sm font-medium flex" onClick={handleClick}>
        Already have an account ? { " " }
        <a href="/" className="text-white hover:text-blue-500 hover:underline">
          Log In
        </a>
      </div>
    </form>
  );
};
export default Signup;
