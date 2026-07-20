const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("async function with generators", () => {
  it("should properly handle generator completion", () => {
    // Create a simple generator function that yields values and then completes
    const generatorFunction = function* () {
      yield 1;
      yield 2;
      return "final value";
    };

    // Wrap it with Q.async
    const asyncFunc = Q.async(generatorFunction);

    // Call the async function and verify it completes with the final value
    return asyncFunc().then(
      (result: any) => {
        expect(result).toBe("final value");
      },
      (error: any) => {
        throw new Error(`Test failed with error: ${error}`);
      }
    );
  });
});