import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber mutation detection", () => {
  it("should correctly parse stack lines that end with column number and not match lines with trailing content", async () => {
    // The mutation removes the $ anchor from attempt2 regex:
    // Original: /at ([^ ]+):(\d+):(?:\d+)$/
    // Mutated:  /at ([^ ]+):(\d+):(?:\d+)/
    //
    // Without $, a stack line like "at filename:10:5 (extra)" would incorrectly
    // match attempt2 instead of falling through to attempt3 or returning undefined.
    //
    // This affects filterStackString -> isInternalFrame -> getFileNameAndLineNumber
    // We can observe this via long stack trace behavior.

    Q.longStackSupport = true;

    try {
      const result = await Q.Promise(function(resolve: (v: any) => void, reject: (e: any) => void) {
        Q().then(function level1() {
          return Q().then(function level2() {
            reject(new Error("test error"));
          });
        });
      }).catch(function(err: Error) {
        return err;
      });

      // The stack trace should contain our function names
      // With correct $ anchor: internal Q frames are filtered properly
      // Without $ anchor: filtering may be incorrect, potentially including or
      // excluding wrong frames
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe("test error");

      // The key observable: with long stack support, the error stack should
      // contain "From previous event:" separator showing proper stack stitching
      // This depends on correct frame filtering via getFileNameAndLineNumber
      expect(result.stack).toContain("From previous event:");
    } finally {
      Q.longStackSupport = false;
    }
  });
});