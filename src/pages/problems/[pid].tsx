import Topbar from "@/Components/Topbar/Topbar";
import Workspace from "@/Components/Workspace/Workspace";
import { problems } from "@/ProblemsData";
import { Problem } from "@/ProblemsData/problems";

import React from "react";

type ProblemPageProps = {
  problem: Problem;
};

const ProblemPage: React.FC<ProblemPageProps> = ({ problem }) => {
  console.log(problem);
  return (
    <div>
      <Topbar problemPage />
      <Workspace problem = {problem}/>
    </div>
  );
};
export default ProblemPage;

// using Server Side Generating ( SSG )  --> generating the pages so as to minimise load on server  , pregereated pages on the server

export async function getStaticPaths() {
  const paths = Object.keys(problems).map((key) => ({
    params: { pid: key },
  }));
  return {
    paths,
    fallback: false, // if the url is not present, return 404
  };
}

// getStaticProps fetches the data
export async function getStaticProps({ params }: { params: { pid: string } }) {
  const { pid } = params;
  const problem = problems[pid];
  if (!problem) {
    return {
      notFound: true,
    };
  }
  problem.handlerFunction = problem.handlerFunction.toString();
  return {
    props: {
      problem,
    },
  };
}
