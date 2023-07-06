import React, { useState } from "react";
import PlaygroundNavbar from "./PlaygroundNavbar";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import Footer from "./Footer";
import { Problem } from "@/ProblemsData/problems";

type PlaygroundProps = {
  problem: Problem;
};

const Playground: React.FC<PlaygroundProps> = ({ problem }) => {
  const [activeTestCase, setActiveTestCase] = useState<number>(0);
  return (
    <div className="flex flex-col bg-dark-layer-1 relative overflow-x-hidden ">
      <PlaygroundNavbar />
      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto">
          <CodeMirror
            value={problem.starterCode}
            theme={vscodeDark}
            extensions={[javascript()]}
            style={{ fontSize: 15 }}
          />
        </div>

        <div className="w-full overflow-auto px-5 ">
          <div className="flex h-10 bg-blue items-center space-x-6">
            <div className="flex relative h-full flex-col justify-center cursor-pointer">
              <div className="text-sm font-small leading-5 text-white">
                TestCases
              </div>
              <div className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white"></div>
            </div>
          </div>

          <div className="flex">
            {problem.examples.map((example, index) => (
              <div
                className="mr-2 items-start mt-3 text-white"
                key={example.id}
                onClick={() => setActiveTestCase(index)}
              >
                <div className="flex flex-wrap  items-center gap-y-4">
                  <div
                    className={`font-medium items-center transition-all focus:outline-none inline-flex  bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
                  ${activeTestCase === index ? "text-white" : "text-gray-500"}`}
                  >
                    Case {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="font-semibold my-5">
            <p className="text-sm font-medium mt-4 text-white">Input:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
              {problem.examples[activeTestCase].inputText}
            </div>

            <p className="text-sm font-medium mt-4 text-white">Output:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
              {problem.examples[activeTestCase].outputText}
            </div>
          </div>
        </div>
      </Split>
      <Footer />
    </div>
  );
};
export default Playground;
