// Assert library is used to compare that the function user passed in the Workspace satisfies all the test cases or not !

import assert from "assert";
import { Problem } from "./problems";

const starterCode = `function twoSum(nums, target){
    // Write your code here
};`;

const handlerFunction = (fn: any) => {
  try {
    const nums = [
      [11, 7, 3, 8],
      [7, 3, 3],
      [9, 4, 8],
    ];

    const targets = [15, 6, 12];

    const answers = [
      [1, 3],
      [1, 2],
      [1, 2],
    ];

    for (let i = 0; i < nums.length; i++) {
      const res = fn(nums[i], targets[i]);
      assert.deepStrictEqual(res, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("Handler function Error");
    throw new Error(error);
  }
};

export const twoSum: Problem = {
  id: "two-sum",
  title: "1. Two Sum",
  problemStatement: `<p class="mt-3">
  Given an array of integers <code>nums</code> and an integer{" "}
  <code>target</code>, return
  <em>
    indices of the two numbers such that they add up to
  </em>{" "}
  <code>target</code>.
</p>
<p class="mt-3">
  You may assume that each input would have{" "}
  <strong>exactly one solution</strong>, and you may not use
  thesame element twice.
</p>
<p class="mt-3">You can return the answer in any order.</p>`,
  examples: [
    {
      id: 1,
      inputText: "nums = [11,7,3,8], target = 15",
      outputText: "[1,3]",
      explanation: "nums[1] + nums[3] = 15 , therefore answer = [1, 3]",
    },
    {
      id: 2,
      inputText: "nums = [7,3,3], target = 6",
      outputText: "[1,2]",
      explanation: "nums[1] + nums[2] = 6 , therefore answer = [1, 2]",
    },
    {
      id: 3,
      inputText: "nums = [9,4,8], target = 12",
      outputText: "[1,2]",
      explanation: "nums[1] + nums[2] = 12 , therefore answer = [1, 2]",
    },
  ],
  constraints: `
  <li class="mt-2">
  <code>2 ≤ nums.length ≤ 10</code>
</li>
<li class="mt-2">
  <code>-10 ≤ nums[i] ≤ 10</code>
</li>
<li class="mt-2">
  <code>-10 ≤ target ≤ 10</code>
</li>
<li class="mt-2 text-sm">
  <strong>Only one valid answer exists.</strong>
</li>`,
  handlerFunction: handlerFunction,
  starterCode: starterCode,
  order: 1,
  starterFunctionName: "function twoSum(",
};
