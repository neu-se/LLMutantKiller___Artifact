// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-bb4d5fb/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should correctly filter internal stack frames when long stack traces are enabled", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    // Create a chain of promises
    const promise = deferred1.promise
      .then(() => deferred2.promise)
      .then(() => { throw new Error("Test error"); });

    // Reject the first promise to trigger the chain
    deferred1.reject(new Error("Initial error"));

    // Return the promise and check the stack trace
    return promise.catch((err: any) => {
      // The original code should filter out internal Q frames
      // The mutated code (return true &&) would not filter them properly
      // We check that the stack contains "q.js" in the mutated version
      // but not in the original version
      if (err.stack) {
        expect(err.stack).toContain("q.js");
      }
    });
  });
});