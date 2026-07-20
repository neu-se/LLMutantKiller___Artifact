import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace filtering", () => {
  it("does not filter out user code frames from the error stack", async () => {
    Q.longStackSupport = true;

    try {
      let capturedError: Error | null = null;

      // We need a chain long enough that makeStackTraceLong is triggered
      // and the error's stack gets filtered
      function outerFunction(): any {
        return Q(1).then(function innerFunction() {
          throw new Error("deliberate error from innerFunction");
        });
      }

      await new Promise<void>((resolve) => {
        outerFunction().then(null, (err: Error) => {
          capturedError = err;
          resolve();
        });
      });

      expect(capturedError).not.toBeNull();
      const stack = capturedError!.stack || "";
      // innerFunction is defined in this file at a small line number
      // Original: only q.js frames filtered → innerFunction preserved in stack
      // Mutated: all frames with lineNumber <= ~1900 filtered → innerFunction removed
      expect(stack).toContain("innerFunction");
    } finally {
      Q.longStackSupport = false;
    }
  });
});