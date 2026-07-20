import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame qStartingLine boundary", () => {
  it("filters the line at exactly qStartingLine from long stack traces", async () => {
    Q.longStackSupport = true;

    try {
      let capturedError: Error | null = null;

      // Create a rejection that goes through Q's internals
      // makeStackTraceLong will call filterStackString which calls isInternalFrame
      // The stack frames from Q itself should all be filtered
      await new Promise<void>((resolve) => {
        Q.reject(new Error("sentinel"))
          .fail((err: Error) => {
            capturedError = err;
            resolve();
          });
      });

      expect(capturedError).not.toBeNull();
      const stack = capturedError!.stack || "";

      // With original code (>=): ALL lines within qStartingLine..qEndingLine are filtered
      // With mutated code (>): the line AT qStartingLine is NOT filtered and appears in stack
      // 
      // We can detect this by checking if any q.js reference appears in the stack.
      // The line at qStartingLine is `var qStartingLine = captureLine();`
      // which is near the top of q.js. With the mutation, this line leaks through.
      const stackLines = stack.split("\n");
      const qJsLines = stackLines.filter((line: string) =>
        line.includes("q.js")
      );

      // Original: qJsLines should be empty (all Q internals filtered)
      // Mutated: qJsLines will contain at least one entry (the qStartingLine frame)
      expect(qJsLines.length).toBe(0);
    } finally {
      Q.longStackSupport = false;
    }
  });
});