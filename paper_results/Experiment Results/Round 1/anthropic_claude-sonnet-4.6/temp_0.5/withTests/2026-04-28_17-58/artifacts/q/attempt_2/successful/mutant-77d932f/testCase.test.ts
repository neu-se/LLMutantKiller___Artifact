import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber", () => {
  it("should filter Q internal frames from long stack traces so q.js lines do not appear", async () => {
    Q.longStackSupport = true;

    try {
      let capturedError: Error | null = null;

      await Q.fcall(() => {
        throw new Error("sentinel error");
      }).catch((e: Error) => {
        capturedError = e;
      });

      expect(capturedError).not.toBeNull();
      const stack = (capturedError as Error).stack || "";
      
      // With original code: getFileNameAndLineNumber correctly parses stack lines,
      // isInternalFrame returns true for q.js lines, and filterStackString removes them.
      // With mutated code: getFileNameAndLineNumber returns undefined, isInternalFrame
      // always returns false, so q.js lines remain in the filtered stack.
      const stackLines = stack.split("\n");
      const qInternalLines = stackLines.filter(line => /\bq\.js\b/.test(line));
      
      expect(qInternalLines.length).toBe(0);
    } finally {
      Q.longStackSupport = false;
    }
  });
});