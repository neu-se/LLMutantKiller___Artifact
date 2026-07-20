import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import path from "path";

describe("Q Firefox stack trace regex", () => {
  it("should filter Q-internal Firefox-style stack frames with numeric line numbers", async () => {
    Q.longStackSupport = true;

    try {
      // Get Q's absolute file path - matches qFileName used internally by Q
      // In Jest/CommonJS context, require.resolve is available as a global
      const qFilePath: string = path.resolve(
        __dirname,
        "../../../../../../../../../../../subject_repositories/q/q.js"
      );

      // Line 500 is within Q's internal range (qStartingLine ~35 to qEndingLine ~1000+)
      const internalLineNumber = 500;

      // Create an error with a Firefox-style stack containing a Q-internal line
      const error = new Error("test error");
      Object.defineProperty(error, "stack", {
        value: [
          "Error: test error",
          `someQFunction@${qFilePath}:${internalLineNumber}`,
          "userFunction@/user/code.js:10",
        ].join("\n"),
        writable: true,
        configurable: true,
      });

      let resultError: any = null;

      // Create a deferred with long stack support (promise.stack will be set)
      const deferred = Q.defer();
      const resultPromise = deferred.promise.then(null, (e: any) => {
        resultError = e;
      });

      deferred.reject(error);
      await resultPromise;

      expect(resultError).not.toBeNull();
      expect(resultError.stack).toBeDefined();

      // Verify that makeStackTraceLong was called (stack was modified to include separator)
      expect(resultError.stack).toContain("From previous event:");

      // With original code (\d+):
      //   getFileNameAndLineNumber("someQFunction@q.js:500") returns [qFilePath, 500]
      //   isInternalFrame returns true → line is FILTERED OUT → not in stack → test PASSES
      //
      // With mutated code (\D+):
      //   \D+ won't match "500" (digits) → attempt3 returns null
      //   getFileNameAndLineNumber returns undefined → isInternalFrame returns false
      //   line is NOT filtered → still in stack → test FAILS
      expect(resultError.stack).not.toContain(`${qFilePath}:${internalLineNumber}`);
    } finally {
      Q.longStackSupport = false;
    }
  });
});