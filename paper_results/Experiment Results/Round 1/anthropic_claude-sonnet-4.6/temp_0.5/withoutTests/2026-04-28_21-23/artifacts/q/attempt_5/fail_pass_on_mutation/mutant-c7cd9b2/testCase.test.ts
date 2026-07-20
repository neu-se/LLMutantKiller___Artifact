import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q getFileNameAndLineNumber attempt2", () => {
  it("should filter attempt2 format lines from Q's file in long stack traces", async () => {
    Q.longStackSupport = true;
    
    // Get q.js's file path from a real stack trace
    const deferred = Q.defer();
    const promiseStack: string = (deferred.promise as any).stack || "";
    
    // Extract q.js file path from promise.stack
    const qFilePathMatch = promiseStack.match(/at defer \(([^:]+):/);
    if (!qFilePathMatch) {
      // Can't determine q.js path, skip test
      deferred.resolve(1);
      await deferred.promise;
      return;
    }
    const qFilePath = qFilePathMatch[1];
    
    // Create an error with attempt2 format lines from q.js
    // These lines should be filtered by isInternalFrame using attempt2 regex
    const err = new Error("test");
    const attempt2Line = `    at ${qFilePath}:100:5`;
    err.stack = `Error: test\n    at userCode (test.js:1:1)\n${attempt2Line}`;
    
    // Reject the deferred with this error
    deferred.reject(err);
    
    const caught = await deferred.promise.then(null, (e: Error) => e);
    const finalStack = caught.stack || "";
    
    // The attempt2 format line from q.js should be filtered by isInternalFrame
    // In original: attempt2 regex works, line is identified as internal and filtered
    // In mutated: attempt2 disabled, line is NOT identified, remains in stack
    expect(finalStack).not.toContain(attempt2Line.trim());
  });
});