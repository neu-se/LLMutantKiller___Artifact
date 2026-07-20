import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong with long stack support", () => {
  it("should include multiple promise stack frames when building long stack traces", async () => {
    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    // Create a chain of promises to build up stack frames
    const result = await Q.promise(function(resolve: Function) {
      resolve(42);
    })
    .then(function level1(value: number) {
      return Q.promise(function(resolve: Function) {
        resolve(value);
      });
    })
    .then(function level2(value: number) {
      return Q.promise(function(resolve: Function, reject: Function) {
        reject(new Error("test rejection"));
      });
    })
    .then(function level3() {
      return "should not reach here";
    })
    .fail(function(err: Error) {
      capturedError = err;
      return "caught";
    });

    expect(result).toBe("caught");
    expect(capturedError).not.toBeNull();
    
    const errorStack = (capturedError as Error).stack || "";
    
    // With long stack support, the stack should contain the separator
    // indicating multiple promise frames were concatenated
    // The original code adds stacks where stackCounter > error.__minimumStackCounter__
    // The mutation prevents this by replacing the condition with false
    expect(errorStack).toContain("From previous event:");
    
    // Count occurrences of the separator - with the original code, multiple
    // promise frames should be included; with the mutation, fewer will be
    const separatorCount = (errorStack.match(/From previous event:/g) || []).length;
    
    // With a chain of 3+ promises and long stack support, we should see
    // at least 2 "From previous event:" separators in the original
    // The mutation would cause only 1 or 0 separators
    expect(separatorCount).toBeGreaterThanOrEqual(2);
  });
});