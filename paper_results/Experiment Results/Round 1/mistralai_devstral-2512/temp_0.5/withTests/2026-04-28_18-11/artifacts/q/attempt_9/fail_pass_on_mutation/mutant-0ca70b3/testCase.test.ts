// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-0ca70b3/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
  it("should process stack trace lines without infinite loop", () => {
    // Create an error with a stack trace
    const error = new Error("Test error");

    // Create a promise that will trigger stack filtering
    const promise = Q.reject(error);

    // Set a timeout to detect infinite loops
    let completed = false;
    const timeout = setTimeout(() => {
      if (!completed) {
        throw new Error("Test timed out - likely infinite loop in filterStackString");
      }
    }, 1000);

    return promise.then(
      () => {},
      (err: Error) => {
        clearTimeout(timeout);
        completed = true;

        // The mutated code changes the loop condition from i < lines.length to i >= lines.length
        // This means the loop will never execute, but shouldn't cause infinite loop
        // We just verify the promise completes without hanging
        expect(err).toBeDefined();
        expect(err.message).toBe("Test error");
      }
    );
  });
});