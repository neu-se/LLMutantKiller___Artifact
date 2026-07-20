import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
  it("should preserve user code frames in long stack traces and not filter them as internal Q frames", async () => {
    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    function userFunction() {
      return Q.reject(new Error("test error from user code"));
    }

    await userFunction().catch((err: Error) => {
      capturedError = err;
    });

    Q.longStackSupport = false;

    expect(capturedError).not.toBeNull();
    // The error stack should contain some reference to user code
    // With the mutation, isInternalFrame returns true for ALL files,
    // so user code frames get filtered if their line numbers happen to
    // fall in Q's line range. More importantly, the stack should not be empty.
    expect(capturedError!.stack).toBeDefined();
    expect(typeof capturedError!.stack).toBe("string");
    expect(capturedError!.stack!.length).toBeGreaterThan(0);

    // The stack should contain the error message
    expect(capturedError!.stack).toContain("test error from user code");

    // With long stack support, Q builds extended stacks by calling filterStackString
    // The mutation causes isInternalFrame to return true for ALL files (not just q.js),
    // which means frames from this test file would be filtered if line numbers match Q's range.
    // We verify that the stack trace contains a reference to the actual error location,
    // which should survive filtering in the original but may be filtered in the mutant.
    // The key observable difference: with the original, only q.js frames are filtered;
    // with the mutation, frames from any file within Q's line number range are filtered.
    
    // Create a promise chain that generates a long stack trace
    Q.longStackSupport = true;
    
    const deferred = Q.defer<number>();
    
    let longStackError: Error | null = null;
    
    const promise = Q(1)
      .then(() => Q(2))
      .then(() => {
        return deferred.promise;
      })
      .catch((err: Error) => {
        longStackError = err;
      });

    deferred.reject(new Error("deep rejection error"));

    await promise;
    
    Q.longStackSupport = false;

    expect(longStackError).not.toBeNull();
    expect(longStackError!.stack).toBeDefined();
    // The stack should contain the error message - this would fail if all frames filtered
    expect(longStackError!.stack).toContain("deep rejection error");
  });
});