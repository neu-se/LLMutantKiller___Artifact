import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces with isInternalFrame filtering", () => {
  it("should include user code frames in long stack traces and not over-filter them", async () => {
    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    function userFunction() {
      return Q.reject(new Error("test error from user code"));
    }

    await userFunction().fail((err: Error) => {
      capturedError = err;
    });

    Q.longStackSupport = false;

    expect(capturedError).not.toBeNull();
    expect(capturedError!.stack).toBeDefined();

    // The stack trace should contain "From previous event:" separator
    // which indicates long stack trace concatenation happened
    // This requires that internal Q frames are filtered but user frames are kept
    // With the mutation (true && lineNumber <= qEndingLine), lines before qStartingLine
    // in q.js would also be treated as internal, potentially causing issues with
    // the stack trace building logic itself
    const stack = capturedError!.stack as string;
    
    // The error message should be present in the stack
    expect(stack).toContain("test error from user code");
    
    // With longStackSupport enabled, the stack should contain the separator
    // indicating that Q successfully concatenated stack traces
    // This works correctly in original but may fail with mutation because
    // the filtering incorrectly removes frames, potentially breaking the
    // stack trace assembly
    expect(stack).toContain("From previous event:");
  });
});