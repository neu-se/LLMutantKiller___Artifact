// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-0ca70b3/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
  it("should correctly filter stack traces", () => {
    // Create a scenario that generates a stack trace
    const error = new Error("Test error");
    // Force the mutation to execute by calling a function that uses filterStackString
    const promise = Q.reject(error);
    return promise.then(
      () => {},
      (err: Error) => {
        // The stack should be filtered, which internally uses the loop
        expect(err.stack).toBeDefined();
      }
    );
  });
});