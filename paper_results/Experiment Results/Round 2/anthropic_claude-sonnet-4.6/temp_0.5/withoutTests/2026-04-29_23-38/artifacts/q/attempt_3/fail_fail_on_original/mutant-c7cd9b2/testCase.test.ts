import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import { createRequire } from "module";
import { fileURLToPath } from "url";

describe("Q getFileNameAndLineNumber attempt2", () => {
  it("should parse anonymous stack frames with single-digit column numbers and filter them", async () => {
    Q.longStackSupport = true;

    // Get Q's absolute file path
    const require = createRequire(import.meta.url);
    const qFilePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");

    // Create an error whose stack contains an anonymous Q-internal frame
    // in attempt2 format: "at /abs/path/to/q.js:LINE:SINGLE_DIGIT_COL"
    // Line 500 is well within Q's internal line range [qStartingLine, qEndingLine]
    const testError = new Error("test");
    const anonymousQFrame = `    at ${qFilePath}:500:5`;
    Object.defineProperty(testError, "stack", {
      value: `Error: test\n    at Object.<anonymous> (test.ts:1:1)\n${anonymousQFrame}`,
      configurable: true,
      writable: true,
    });

    const deferred = Q.defer();
    let capturedError: Error | null = null;

    await new Promise<void>((resolve) => {
      deferred.promise.then(null, (err: Error) => {
        capturedError = err;
        resolve();
      });
      deferred.reject(testError);
    });

    expect(capturedError).not.toBeNull();
    const finalStack = capturedError!.stack || "";

    // Original: attempt2 parses the frame → isInternalFrame returns true → filtered
    // Mutated: attempt2 disabled → getFileNameAndLineNumber returns undefined → frame remains
    expect(finalStack).not.toContain(`at ${qFilePath}:500:5`);
  });
});