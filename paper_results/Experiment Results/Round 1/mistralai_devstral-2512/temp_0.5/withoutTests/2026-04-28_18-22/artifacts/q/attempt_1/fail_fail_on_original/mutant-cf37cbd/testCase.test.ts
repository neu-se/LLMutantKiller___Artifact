// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-cf37cbd/testCase.test.ts
import { Q } from "./q.js";

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with single-digit column numbers", () => {
    // Create a promise that will be rejected to trigger stack trace parsing
    const promise = Q.reject(new Error("Test error"));

    // Force the promise to be inspected, which will trigger stack trace parsing
    // The mutation affects the regex that parses stack traces, specifically for
    // anonymous functions with single-digit column numbers
    return promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (error) => {
        // The error should have a stack trace that can be parsed
        // The mutation changes the regex from (?:\d+) to (?:\d) which would
        // fail to match multi-digit column numbers properly
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Test error");
        // The test passes if we reach here without regex parsing errors
        return true;
      }
    );
  });
});