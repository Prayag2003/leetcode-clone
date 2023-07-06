import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Login from "./Login";
import Signup from "./Signup";
import ResetPassword from "./ResetPassword";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authModelAtom } from "@/atoms/authModelAtoms";

type AuthModelsProps = {};

const AuthModels: React.FC<AuthModelsProps> = () => {
  const authModelState = useRecoilValue(authModelAtom);

  const close = closeAuthModel();
  return (
    <>
      <div className="absolute top-0 left-0 w-full  h-full flex items-center justify-center bg-black bg-opacity-60" onClick={close}></div>
      <div className="w-full sm:w-[450px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  flex justify-center items-center">
        <div className="relative w-full h-full mx-auto flex items-center justify-center">
          <div className="bg-white shadow relative w-full bg-purple-700 mx-6">
            <div className="flex justify-end p-2 bg-purple-700">
              <button
                type="button"
                className="bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:text-white text-white"
                onClick={close}
              >
                <AiOutlineClose className="h-5 w-5" />
              </button>
            </div>
            {authModelState.type === "login" ? (
              <Login />
            ) : authModelState.type === "register" ? (
              <Signup />
            ) : (
              <ResetPassword />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default AuthModels;

function closeAuthModel() {
  const setAuthModel = useSetRecoilState(authModelAtom);

  const closeModel = () => {
    setAuthModel((prevState) => ({
      ...prevState,
      isOpen: false,
      type: "login",
    }));
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModel();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return closeModel;
}
