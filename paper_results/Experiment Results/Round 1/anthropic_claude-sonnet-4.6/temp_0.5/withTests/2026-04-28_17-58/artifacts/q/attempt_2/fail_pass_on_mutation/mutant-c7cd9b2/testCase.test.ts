import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack frame filtering", () => {
  it("should filter Q internal frames from long stack traces", async () => {
    Q.longStackSupport = true;

    try {
      // Create a rejected promise and catch the error to inspect its stack
      const caughtError = await Q.fcall((): never => {
        throw new Error("test error");
      }).then(null, (err: Error) => err);

      expect(caughtError).toBeInstanceOf(Error);
      expect(caughtError.stack).toBeDefined();

      const stack = caughtError.stack as string;
      const lines = stack.split("\n");

      // With proper getFileNameAndLineNumber (attempt2 branch working),
      // Q's own internal frames are identified and filtered out.
      // If attempt2 is broken (if false), qFileName is never set from
      // anonymous-style stack lines, so isInternalFrame always returns false,
      // and Q's internal frames (containing "q.js") leak into the stack.
      //
      // On the original code: Q internal frames are filtered, so "q.js" lines
      // should NOT appear in the filtered stack.
      // On the mutated code: Q internal frames are NOT filtered, so "q.js" lines
      // WILL appear in the filtered stack.
      const qInternalLines = lines.filter(
        (line: string) => line.includes("q.js") && !line.includes("node_modules")
      );

      expect(qInternalLines.length).toBe(0);
    } finally {
      Q.longStackSupport = false;
    }
  });
});