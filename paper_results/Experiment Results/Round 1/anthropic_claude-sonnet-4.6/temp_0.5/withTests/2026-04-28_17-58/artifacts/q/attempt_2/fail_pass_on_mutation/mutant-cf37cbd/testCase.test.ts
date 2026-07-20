import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber via long stack traces", () => {
  it("should filter Q internal frames from long stack traces when column number has multiple digits", async () => {
    Q.longStackSupport = true;

    try {
      // Create a rejection with a long stack trace
      // The stack trace filtering depends on captureLine() correctly parsing
      // the stack line including multi-digit column numbers.
      // If captureLine() fails (mutant), qStartingLine is undefined,
      // isInternalFrame always returns false, and Q's own frames are NOT filtered.
      
      let capturedStack = "";

      await Q()
        .then(function userFunction() {
          throw new Error("deliberate error");
        })
        .catch(function (err: Error) {
          capturedStack = err.stack || "";
        });

      // On original: Q internal frames (promiseDispatch, flush, runSingle, etc.)
      // are filtered out by isInternalFrame, so they don't appear in the stack.
      // On mutant: captureLine() returns undefined (column >= 10 won't match \d),
      // so qStartingLine is undefined, isInternalFrame always returns false,
      // and Q internal frames ARE included in the filtered stack.
      
      // "promiseDispatch" is a Q-internal function that should be filtered out
      // when stack filtering works correctly.
      expect(capturedStack).not.toContain("promiseDispatch");
    } finally {
      Q.longStackSupport = false;
    }
  });
});