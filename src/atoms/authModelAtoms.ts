import { atom } from "recoil";

type AuthModelState = {
  isOpen: boolean;
  type: "login" | "register" | "resetPassword";
};

const initialAuthModelState: AuthModelState = {
  isOpen: false,
  type: "login",
};

export const authModelAtom = atom<AuthModelState>({
  key: "authModelAtoms",
  default: initialAuthModelState,
});
