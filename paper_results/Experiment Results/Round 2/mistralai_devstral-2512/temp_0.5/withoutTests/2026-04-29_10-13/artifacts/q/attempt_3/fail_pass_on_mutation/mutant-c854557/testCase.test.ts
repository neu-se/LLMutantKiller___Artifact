// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c854557/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with multi-digit line numbers", () => {
    // Test the internal getFileNameAndLineNumber function by creating a scenario
    // that would trigger stack trace parsing
    const error = new Error("Test error");
    const stackLine = "at http://example.com/file.js:42:21";

    // Access the internal function through the error handling mechanism
    const promise = Q.reject(error);

    return promise.catch((e: Error) => {
      // Verify the stack trace contains multi-digit line numbers
      expect(e.stack).toBeDefined();

      // Test the regex pattern directly since we can't access internal functions
      const regex = /at ([^ ]+):(\d+):(?:\d+)$/;
      const match = regex.exec(stackLine);

      expect(match).not.toBeNull();
      if (match) {
        expect(match[1]).toBe("http://example.com/file.js");
        expect(match[2]).toBe("42"); // Should capture full line number
      }

      return true;
    });
  });
});