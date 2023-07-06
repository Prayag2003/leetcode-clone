import React from "react";
import Split from "react-split";
import Description from "./ProblemDesc/Description";
import Playground from "./Playground/Playground";
import { Problem } from "@/ProblemsData/problems";

type WorkspaceProps = {
  problem: Problem;
};

const Workspace: React.FC<WorkspaceProps> = ({ problem }) => {
  return (
    <Split className="split" minSize={0}>
      <Description problem={problem} />
      <div className="bg-fill-dark-2">
        <Playground problem={problem} />
      </div>
    </Split>
  );
};
export default Workspace;
