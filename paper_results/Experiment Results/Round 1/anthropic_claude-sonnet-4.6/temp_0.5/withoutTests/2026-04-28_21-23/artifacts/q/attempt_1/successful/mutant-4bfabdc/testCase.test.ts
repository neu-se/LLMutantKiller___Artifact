import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString - node frame filtering", () => {
  it("should filter out node frames from long stack traces", async () => {
    // Enable long stack support to trigger makeStackTraceLong
    Q.longStackSupport = true;

    // Create a fake stack trace that includes a node frame
    // filterStackString is called internally, but we can observe its effect
    // through the error stack in rejection handlers
    
    // We need to craft a situation where a stack line matching node frame pattern
    // "(node.js:" or "(module.js:" appears and verify it gets filtered
    
    // The filterStackString function filters lines where isNodeFrame returns true
    // isNodeFrame checks for "(module.js:" or "(node.js:" in the line
    
    // We'll test by rejecting a promise and checking the stack trace
    // In the mutated version, node frames would NOT be filtered
    
    const nodeFrameLine = "    at Object.<anonymous> (module.js:456:3)";
    const normalLine = "    at someFunction (someFile.js:10:5)";
    
    // We can access filterStackString indirectly by triggering makeStackTraceLong
    // Let's create an error with a controlled stack and see what happens
    
    // Actually, let's test Q's promise rejection stack trace behavior
    // by checking that the error passed to rejection handlers has filtered stacks
    
    const deferred = Q.defer();
    
    const error = new Error("test error");
    // Manually craft a stack that includes a node frame
    error.stack = `Error: test error\n${normalLine}\n${nodeFrameLine}`;
    
    let capturedError: Error | null = null;
    
    const promise = deferred.promise.then(null, function(err: Error) {
      capturedError = err;
      return null;
    });
    
    deferred.reject(error);
    
    await promise;
    
    // In the original: node frames are filtered out, so nodeFrameLine should NOT appear
    // In the mutated version: node frames are NOT filtered, so nodeFrameLine WOULD appear
    expect(capturedError).not.toBeNull();
    
    if (capturedError && (capturedError as Error).stack) {
      // The node frame line should be filtered out in the original code
      // but present in the mutated code
      expect((capturedError as Error).stack).not.toContain("module.js:456");
    }
    
    Q.longStackSupport = false;
  });
});