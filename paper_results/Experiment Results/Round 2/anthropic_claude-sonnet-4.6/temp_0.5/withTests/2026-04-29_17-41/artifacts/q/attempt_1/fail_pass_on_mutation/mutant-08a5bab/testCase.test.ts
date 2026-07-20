import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack trace filtering", () => {
  it("should preserve user function names in long stack traces", async () => {
    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    function outerFunction() {
      return Q().then(function innerFunction() {
        throw new Error("test error");
      });
    }

    try {
      await outerFunction().then(null, (err: Error) => {
        capturedError = err;
        throw err;
      });
    } catch (e) {
      // expected
    }

    Q.longStackSupport = false;

    expect(capturedError).not.toBeNull();
    // With the mutation, isInternalFrame always returns true, so filterStackString
    // removes ALL lines from the stack trace, resulting in an empty string.
    // With the original code, only Q-internal frames are filtered, so user
    // function names like "innerFunction" or "outerFunction" remain visible.
    const stack = (capturedError as Error).stack || "";
    expect(stack.length).toBeGreaterThan(0);
    // The stack should contain at least some content - with the mutation
    // all frames are filtered as "internal" leaving an empty stack
    expect(stack).toMatch(/innerFunction|outerFunction|test error/);
  });
});