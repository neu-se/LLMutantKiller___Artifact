import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace filtering", () => {
  it("filters Q internal frames from concatenated long stack traces", async () => {
    Q.longStackSupport = true;
    
    let capturedError: any;
    
    // Create a chain that will reject, triggering makeStackTraceLong
    const deferred = Q.defer();
    
    const chainPromise = new Promise<void>((resolve) => {
      deferred.promise
        .then(function userStep() {
          throw new Error("test rejection");
        })
        .fail(function userCatch(err: any) {
          capturedError = err;
          resolve();
        });
    });
    
    deferred.resolve(1);
    await chainPromise;
    
    Q.longStackSupport = false;
    
    expect(capturedError).toBeDefined();
    expect(capturedError.stack).toBeDefined();
    
    const stack: string = capturedError.stack;
    
    // With original code: Q's internal frames are filtered
    // The stack should not contain references to Q's internal implementation
    // With mutated code: Q's internal frames are NOT filtered
    // The stack will contain Q's internal frames
    
    // Count lines in the stack - with filtering, there should be fewer lines
    // But more reliably: check for Q's internal frame markers
    
    // The "From previous event:" separator should appear (long stack support working)
    expect(stack).toContain("From previous event:");
    
    // With original: Q's frames are filtered, so the stack after "From previous event:"
    // should only contain user code frames, not Q internal ones
    // With mutated: Q's frames are present
    
    // Check that Q's internal frames are absent
    expect(stack).not.toMatch(/q\.js:\d+/);
  });
});