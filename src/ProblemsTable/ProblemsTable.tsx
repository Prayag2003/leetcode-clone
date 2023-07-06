import { problems } from "@/Components/mockProblems/problems";
import Link from "next/link";
import { AiFillYoutube } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import Youtube from "react-youtube";
import { AiOutlineClose } from "react-icons/ai";

type ProblemsTableProps = {};

const ProblemsTable: React.FC<ProblemsTableProps> = () => {
  const [youtubePlayer, setYoutubePlayer] = useState({
    isOpen: false,
    videoId: "",
  });

  const closeModel = () => {
    setYoutubePlayer({ isOpen: false, videoId: "" as string });
  };

  useEffect(() => {
    const pressedEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModel();
      }
    };
    window.addEventListener("keydown", pressedEscape);

    return () => {
      window.removeEventListener("keydown", pressedEscape);
    };
  }, []);

  return (
    <>
      <tbody className="text-white">
        {problems.map((document, index) => {
          const difficultyColor =
            document.difficulty === "Easy"
              ? "text-dark-green-s"
              : document.difficulty === "Medium"
              ? "text-yellow-500"
              : "text-red-500";
          return (
            <tr
              className={`${index % 2 === 1 ? "bg-dark-layer-1" : ""} `}
              key={document.id}
            >
              <th className="px-2 py-4  font-medium whitespace-nowrap text-dark-green-s">
                <BsCheckCircle fontSize={"18"} width="18" />
              </th>
              <td className="py-6 px-4">
                <Link
                  className="hover:text-blue-600 cursor-pointer "
                  href={`/problems/${document.id}`}
                >
                  {document.title}
                </Link>
              </td>

              <td className={`px-6 py-4 ${difficultyColor}`}>
                {document.difficulty}
              </td>

              <td className={`px-6 py-4`}>{document.category}</td>

              <td className={`px-6 py-4`}>
                {document.videoId ? (
                  <AiFillYoutube
                    fontSize={"30"}
                    width="18"
                    className="cursor-pointer hover:text-red-600"
                    onClick={() => {
                      setYoutubePlayer({
                        isOpen: true,
                        videoId: document.videoId as string,
                      });
                    }}
                  />
                ) : (
                  <p className="text-gray-400">Coming Soon</p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>

      {youtubePlayer.isOpen && (
        <tfoot className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center ">
          <div className="bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute"></div>
          <div className="w-full z-50 h-full px-6 relative max-w-4xl">
            <div className="w-full h-full flex items-center justify-center relative">
              <div className="w-full relative">
                <AiOutlineClose
                  fontSize={"20"}
                  className="cursor-pointer absolute -top-9 right-0"
                  onClick={closeModel}
                />
                <Youtube
                  videoId={youtubePlayer.videoId}
                  loading="lazy"
                  iframeClassName="w-full min-h-[430px]"
                />
              </div>
            </div>
          </div>
        </tfoot>
      )}
    </>
  );
};
export default ProblemsTable;
