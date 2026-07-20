import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber parses multi-digit line numbers", () => {
  it("captureLine returns a valid line number so Q frames are filtered from stack traces", async () => {
    Q.longStackSupport = true;

    try {
      let capturedStack = "";

      await new Promise<void>((resolve) => {
        function userFunction() {
          return Q.reject(new Error("boom"));
        }

        userFunction().then(null, function (err: Error) {
          capturedStack = err.stack || "";
          resolve();
        });
      });

      // With original code: captureLine() correctly parses multi-digit line numbers
      // from q.js (which is hundreds of lines long), so qStartingLine and qEndingLine
      // are valid numbers. isInternalFrame() correctly identifies and filters out
      // Q's own stack frames. The resulting stack should NOT contain references
      // to q.js internal lines.
      //
      // With mutated code: captureLine() fails to parse multi-digit line numbers,
      // returns undefined, qStartingLine is undefined. isInternalFrame() always
      // returns false. Q's own frames from q.js ARE included in the stack.
      //
      // We check that q.js internal frames appear or not:
      const qjsFrameCount = (capturedStack.match(/[\/\\]q\.js:/g) || []).length;

      // With original: Q internals filtered, so q.js frames should be minimal/absent
      // With mutated: Q internals NOT filtered, so multiple q.js frames appear
      expect(qjsFrameCount).toBeLessThanOrEqual(1);
    } finally {
      Q.longStackSupport = false;
    }
  });
});