import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString in makeStackTraceLong", () => {
  it("should preserve non-internal stack frames when building long stack traces", async () => {
    // Enable long stack support to trigger makeStackTraceLong
    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    try {
      await Q.reject(new Error("test rejection"))
        .then(() => {})
        .fail((err: Error) => {
          capturedError = err;
          // Don't re-reject, just capture
        });
    } catch (e) {
      // ignore
    }

    // Create a scenario where makeStackTraceLong is called and filterStackString is exercised
    const deferred = Q.defer();
    const error = new Error("test error for stack filtering");
    
    let resolvedError: Error | null = null;
    
    const promise = deferred.promise.then(
      null,
      (err: Error) => {
        resolvedError = err;
        return null;
      }
    );

    deferred.reject(error);

    await promise;

    // The error should have been captured
    expect(resolvedError).not.toBeNull();
    
    if (resolvedError && (resolvedError as Error).stack) {
      // With the original code, filterStackString iterates through lines
      // and returns non-empty result for non-empty stacks
      // With the mutated code, filterStackString returns "" always
      // makeStackTraceLong sets error.stack to the filtered result
      // So with mutation, error.stack would be set to "" (empty string)
      // With original, error.stack would contain the actual stack frames
      
      // The stack should contain meaningful content (not be empty)
      // This tests that filterStackString actually processes lines
      const stack = (resolvedError as Error).stack;
      
      // Stack should contain the error message at minimum
      // With the original filterStackString working, the stack won't be empty
      // With the mutation (loop never runs), stack becomes ""
      expect(typeof stack).toBe("string");
      expect(stack.length).toBeGreaterThan(0);
    }

    // More direct test: use Q.longStackSupport and check stack is non-empty
    // after makeStackTraceLong processes it
    Q.longStackSupport = true;
    
    const deferred2 = Q.defer();
    let finalError: Error | null = null;
    
    const p = deferred2.promise
      .then(() => {
        // This creates a new promise in the chain
        return Q.when(null);
      })
      .then(null, (err: Error) => {
        finalError = err;
      });

    const testError = new Error("stack filter test");
    deferred2.reject(testError);
    
    await p;
    
    expect(finalError).not.toBeNull();
    if (finalError) {
      // With original code: filterStackString processes lines, returns non-empty string
      // With mutated code: filterStackString returns "" (empty string), so stack becomes ""
      const stack = (finalError as Error).stack;
      expect(stack).toBeDefined();
      // The stack should be non-empty - original code preserves non-internal frames
      // Mutated code would make this empty
      expect(stack!.length).toBeGreaterThan(0);
    }
  });
});