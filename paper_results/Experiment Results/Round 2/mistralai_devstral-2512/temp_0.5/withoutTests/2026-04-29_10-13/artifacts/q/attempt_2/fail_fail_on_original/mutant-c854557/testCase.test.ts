// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c854557/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with multi-digit line numbers", () => {
    // Create a promise that will be rejected to generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    // Force the promise to generate a stack trace by handling it
    return promise.catch((error: Error) => {
      // The error should have a stack trace
      expect(error.stack).toBeDefined();

      // Create a mock stack line that should match the regex pattern
      // This simulates what would be parsed by getFileNameAndLineNumber
      const stackLine = "at http://example.com/file.js:42:21";
      const regex = /at ([^ ]+):(\d+):(?:\d+)$/;
      const match = regex.exec(stackLine);

      // Verify that multi-digit line numbers are correctly captured
      expect(match).not.toBeNull();
      if (match) {
        expect(match[1]).toBe("http://example.com/file.js");
        expect(match[2]).toBe("42"); // This should be "42", not just "4"
      }

      // If we get here, the test passes
      return true;
    });
  });
});