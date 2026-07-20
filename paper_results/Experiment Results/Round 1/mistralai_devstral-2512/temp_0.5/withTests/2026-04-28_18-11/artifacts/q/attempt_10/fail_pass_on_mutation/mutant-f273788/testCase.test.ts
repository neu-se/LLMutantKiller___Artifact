// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_10/pending_category/mutant-f273788/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.fapply", () => {
  it("should correctly pass arguments to the function being applied", async () => {
    const testFn = (a: number, b: number, c: number) => {
      // This will fail if arguments are not passed correctly
      if (a !== 1 || b !== 2 || c !== 3) {
        throw new Error(`Incorrect arguments: ${a}, ${b}, ${c}`);
      }
      return a + b + c;
    };

    // Test with fapply
    const result = await Q(testFn).fapply([1, 2, 3]);
    expect(result).toBe(6);
  });
});