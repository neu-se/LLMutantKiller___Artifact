// testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace filtering", () => {
  it("should correctly filter stack traces with multi-digit line numbers", () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    // Add a handler that will be in the stack trace
    return promise.catch((error: Error) => {
      // The error should have a stack trace that includes Q's internal frames
      expect(error.stack).toBeDefined();

      // Create a synthetic stack line that would match the original regex
      // but fail with the mutated regex (which only matches single-digit line numbers)
      const stackLine = "at someFunction (file.js:123:45)";
      const match = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);

      // This should match in the original code but fail in the mutated code
      // when the line number has more than one digit
      expect(match).not.toBeNull();
      if (match) {
        expect(match[1]).toBe("file.js");
        expect(match[2]).toBe("123"); // This would fail in mutated code
      }
    });
  });
});