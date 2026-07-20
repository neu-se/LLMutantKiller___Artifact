import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame only filters Q internal frames", () => {
  it("should include user function names in filtered long stack traces", async () => {
    Q.longStackSupport = true;

    try {
      function uniqueUserFunctionNameXYZ123(): any {
        const d = Q.defer();
        setTimeout(() => {
          d.reject(new Error("test rejection"));
        }, 0);
        return d.promise;
      }

      let capturedStack = "";

      await new Promise<void>((resolve) => {
        uniqueUserFunctionNameXYZ123().then(
          null,
          (err: Error) => {
            capturedStack = err.stack || "";
            resolve();
          }
        );
      });

      // With original code: only Q's own file frames are filtered, so
      // uniqueUserFunctionNameXYZ123 should appear in the stack.
      // With mutated code: ALL frames with line number <= qEndingLine (~1900+)
      // are filtered, which includes our test file's small line numbers,
      // so uniqueUserFunctionNameXYZ123 would be filtered out.
      expect(capturedStack).toContain("uniqueUserFunctionNameXYZ123");
    } finally {
      Q.longStackSupport = false;
    }
  });
});