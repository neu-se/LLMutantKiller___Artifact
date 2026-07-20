import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame", () => {
  it("stack filtering should preserve frames from files other than Q", async () => {
    Q.longStackSupport = true;

    // Create a multi-level promise chain to ensure makeStackTraceLong has
    // a promise with .stack to work with
    const outerDeferred = Q.defer<void>();
    
    // Verify promise.stack is set (this is critical)
    const outerStack = (outerDeferred.promise as any).stack as string | undefined;
    
    // If promise.stack is not set, makeStackTraceLong won't run
    // We need this to be set for the test to be meaningful
    if (!outerStack || outerStack.length === 0) {
      Q.longStackSupport = false;
      // Force test failure to indicate environment issue
      expect(outerStack).toBeDefined();
      return;
    }

    let capturedError: Error | null = null;

    outerDeferred.promise.then(null, (err: Error) => {
      capturedError = err;
    });

    const testError = new Error("test_error_for_mutation_detection");
    outerDeferred.reject(testError);

    await new Promise<void>(resolve => setTimeout(resolve, 100));

    Q.longStackSupport = false;

    expect(capturedError).not.toBeNull();
    
    const finalStack = capturedError!.stack || "";
    
    // With original isInternalFrame: frames from THIS test file (not Q's file) are preserved
    // With mutated isInternalFrame (returns lineNumber <= qEndingLine):
    //   - test file frames at small line numbers (< qEndingLine) are filtered OUT
    //   - OR if qEndingLine is undefined, nothing extra is filtered
    
    // The key observable: "at" frames should exist in the filtered stack
    // Original: test file frames survive → "at" lines present
    // Mutation with large qEndingLine: all "at" lines filtered → none present
    // Mutation with undefined qEndingLine: same as original (nothing extra filtered)
    
    const atLines = finalStack.split("\n").filter(l => l.trim().startsWith("at "));
    expect(atLines.length).toBeGreaterThan(0);
  });
});