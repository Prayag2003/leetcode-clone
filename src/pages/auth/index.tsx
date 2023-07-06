import AuthModels from "@/Components/Models/AuthModels";
import Navbar from "@/Components/Navbar/Navbar";
import { authModelAtom } from "@/atoms/authModelAtoms";
import { auth } from "@/firebase/firebase";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
  const authModel = useRecoilValue(authModelAtom);
  const [user, loading, error] = useAuthState(auth);
  const [pageLoading, setPageLoading] = useState(true);
  const Router = useRouter();

  useEffect(() => {
    if (user) Router.push("/");
    if (!loading && !user) setPageLoading(false);
  }, [user, Router, loading]);

  if (pageLoading) return null;

  return (
    <div className="bg-gradient-to-b from-purple-800 to-orange-600 h-screen relative ">
      <div className="max-w-7xl mx-auto">
        <Navbar />

        <div className="flex items-center justify-center h-[calc(100vh-8rem)] pointer-events-none select-none">
          <Image src="/hero.png" alt="Hero Image" width={550} height={600}/>
        </div>
        {authModel.isOpen && <AuthModels />}
      </div>
    </div>
  );
};
export default AuthPage;
