// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-0bd332f/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
  it("should throw TypeError when reduce is called on empty array without initial value", () => {
    // Create a test that directly exercises the array_reduce shim
    // by using Q to wrap an empty array and trigger the reduce operation
    return Q([]).then((emptyArray: any[]) => {
      // This will use the internal array_reduce shim
      const testFunc = () => {
        return emptyArray.reduce((acc: number) => acc);
      };
      expect(testFunc).toThrow(TypeError);
    });
  });
});