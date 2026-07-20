// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-0bd332f/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
  it("should throw TypeError when reduce is called on an empty array without initial value", () => {
    expect(() => {
      Q([].reduce((acc: number, val: number) => acc + val));
    }).toThrow(TypeError);
  });
});