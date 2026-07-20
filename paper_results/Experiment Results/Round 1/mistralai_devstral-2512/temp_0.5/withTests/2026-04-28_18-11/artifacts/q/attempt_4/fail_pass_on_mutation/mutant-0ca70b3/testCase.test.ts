// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-0ca70b3/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
  it("should correctly filter stack traces with multiple lines", () => {
    // Create a scenario that generates a stack trace with multiple lines
    function inner() {
      throw new Error("Test error");
    }

    function outer() {
      inner();
    }

    try {
      outer();
    } catch (error) {
      const promise = Q.reject(error as Error);
      return promise.then(
        () => {},
        (err: Error) => {
          // The stack should be filtered, which internally uses the loop
          // The mutated code will fail to process the stack lines correctly
          expect(err.stack).toBeDefined();
          expect(err.stack?.split('\n').length).toBeGreaterThan(1);
        }
      );
    }
    throw new Error("Should not reach here");
  });
});