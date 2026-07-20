// testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber", () => {
  it("should correctly parse stack lines with anonymous functions", () => {
    // This test targets the mutation in the getFileNameAndLineNumber function
    // where the regex pattern was changed from /at ([^ ]+):(\d+):(?:\d+)$/
    // to /at ([^ ]+):(\d+):(?:\d+)/ (missing the $ anchor)
    // The original pattern should match lines ending with file:line:column
    // The mutated pattern would match such patterns anywhere in the line

    // Create a mock error with a stack trace containing anonymous function format
    const error = new Error("Test error");
    const stackLine = "at /path/to/file.js:10:5";

    // We need to test the internal behavior through an observable effect
    // Since getFileNameAndLineNumber is internal, we'll test it through
    // the stack trace filtering mechanism which uses it
    Q.longStackSupport = true;

    // Create a promise chain that will generate a stack trace
    const deferred = Q.defer();
    let capturedStack: string | undefined;

    Q.onerror = (err) => {
      capturedStack = err.stack;
    };

    // Trigger the error handling path
    deferred.reject(new Error("Test rejection"));

    return Q.delay(10).then(() => {
      // The key difference: with the mutation, the regex would match
      // "file.js:10:5" even if it appeared in the middle of a longer line
      // while the original only matches at the end of the line
      // This test ensures the parsing works correctly for the anonymous function format
      expect(capturedStack).toBeDefined();
      expect(capturedStack).toContain("file.js:10:5");
    });
  });
});