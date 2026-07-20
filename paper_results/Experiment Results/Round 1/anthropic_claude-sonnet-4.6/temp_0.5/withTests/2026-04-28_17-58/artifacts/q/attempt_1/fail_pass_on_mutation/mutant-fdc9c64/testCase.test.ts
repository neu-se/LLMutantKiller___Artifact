import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces with isInternalFrame filtering", () => {
  it("should include user function names in long stack traces when they are not in the Q file", async () => {
    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    function userFunction3(): Promise<never> {
      return Q.reject(new Error("test rejection"));
    }

    function userFunction2(): Promise<never> {
      return userFunction3();
    }

    function userFunction1(): Promise<never> {
      return userFunction2();
    }

    try {
      await userFunction1().then(null, (err: Error) => {
        capturedError = err;
        return Q.resolve();
      });
    } finally {
      Q.longStackSupport = false;
    }

    expect(capturedError).not.toBeNull();
    const stack = (capturedError as Error).stack || "";
    // The stack trace should contain user function names.
    // With the mutation, isInternalFrame returns true for any line with
    // lineNumber <= qEndingLine (which is a large number covering the whole Q file),
    // causing user frames from other files to be incorrectly filtered out
    // when their line numbers happen to be <= qEndingLine.
    // However, the key observable difference: the mutation causes
    // (lineNumber <= qEndingLine) to be true for ALL small line numbers in ANY file,
    // so user code at small line numbers gets filtered.
    // Our test functions are defined at small line numbers in this test file,
    // so they should appear in the stack with original code but may be filtered with mutation.
    expect(stack).toMatch(/userFunction/);
  });
});