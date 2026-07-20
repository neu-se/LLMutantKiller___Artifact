import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation detection", () => {
  it("should preserve non-node, non-internal frames in filtered stack traces", async () => {
    Q.longStackSupport = true;

    // Create a rejection with a custom error that has a stack trace
    // containing a recognizable non-node frame
    const markerFunctionName = "uniqueApplicationFrameMarker_xyz123";
    
    let capturedError: Error | null = null;

    const deferred = Q.defer();
    
    const promise = deferred.promise.then(null, function capturedRejectionHandler(err: Error) {
      capturedError = err;
      // Return to prevent unhandled rejection
      return null;
    });

    // Create an error with a stack that includes a recognizable frame
    const err = new Error("test rejection");
    // Manually craft a stack with a non-node, non-internal frame
    // The stack will naturally include frames from this test file
    
    deferred.reject(err);

    await promise;

    // The error should have been processed by makeStackTraceLong -> filterStackString
    // In original: non-node frames are kept (lines NOT matching node frame patterns)
    // In mutated: only node frames are kept (lines matching node frame patterns like module.js, node.js)
    
    // The captured error's stack should contain frames from this test file
    // (which are NOT node frames), so they should be present in original
    // but absent (or the stack would be empty/different) in the mutation
    
    expect(capturedError).not.toBeNull();
    
    if (capturedError && (capturedError as Error).stack) {
      const stack = (capturedError as Error).stack;
      
      // In the original code, non-node frames (like our test file frames) are kept
      // In the mutated code, only node frames (module.js, node.js) are kept
      // The stack should contain some content from our test file or the error message
      // The error message line itself is not a frame, so it passes through differently
      
      // A non-node frame would be something like "at Object.<anonymous> (testCase.test.ts:X:Y)"
      // These should be present in original but NOT in mutated version
      // We check that the stack contains at least one non-node frame
      const lines = stack.split("\n");
      const hasNonNodeFrame = lines.some(line => 
        line.trim().startsWith("at ") && 
        !line.includes("(module.js:") && 
        !line.includes("(node.js:") &&
        line.trim().length > 0
      );
      
      expect(hasNonNodeFrame).toBe(true);
    }
  });
});