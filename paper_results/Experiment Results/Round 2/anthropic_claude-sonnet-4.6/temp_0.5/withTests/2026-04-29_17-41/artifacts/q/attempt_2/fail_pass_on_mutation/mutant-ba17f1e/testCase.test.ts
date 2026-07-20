import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace filtering", () => {
  it("should filter Q internal frames from long stack traces, keeping only user frames", () => {
    Q.longStackSupport = true;

    function userFunction() {
      return Q.reject(new Error("test error"));
    }

    return userFunction().catch(function (err: any) {
      Q.longStackSupport = false;
      const stack: string = err.stack || "";
      // With original code: getFileNameAndLineNumber correctly parses named
      // function frames, captureLine() sets qFileName to q.js path and
      // qStartingLine/qEndingLine to the line range, so isInternalFrame
      // filters out Q's own frames. The stack should NOT contain "q.js".
      // With mutated code: getFileNameAndLineNumber returns undefined for
      // named function frames, captureLine() returns undefined, qFileName
      // is undefined, isInternalFrame always returns false, Q's own frames
      // are NOT filtered. The stack WILL contain "q.js".
      expect(stack).not.toMatch(/q\.js/);
    });
  });
});