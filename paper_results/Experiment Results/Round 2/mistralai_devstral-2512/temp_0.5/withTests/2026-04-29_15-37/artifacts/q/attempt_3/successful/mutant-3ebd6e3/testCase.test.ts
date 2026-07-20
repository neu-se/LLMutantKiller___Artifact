// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_3/pending_category/mutant-3ebd6e3/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("allSettled behavior", () => {
  it("should return promise states for all promises", () => {
    const fulfilledPromise = Q.resolve(42);
    const rejectedPromise = Q.reject(new Error("test error"));

    return Q.allSettled([fulfilledPromise, rejectedPromise]).then((result) => {
      expect(result).toEqual([
        { state: "fulfilled", value: 42 },
        { state: "rejected", reason: new Error("test error") }
      ]);
    });
  });
});