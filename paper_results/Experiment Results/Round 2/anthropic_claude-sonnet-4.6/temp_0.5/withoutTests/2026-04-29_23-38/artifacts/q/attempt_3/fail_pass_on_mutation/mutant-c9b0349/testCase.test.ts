import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q isInternalFrame", () => {
  it("should not filter frames with line numbers below qStartingLine", () => {
    Q.longStackSupport = true;
    
    // Create a deferred and resolve it to trigger the promise chain
    const deferred = Q.defer();
    
    let capturedError: any = null;
    
    // The throw happens at a small line number in this file
    // qStartingLine in q.js is around line 87-89
    // So a frame at line < 87 should NOT be filtered by original
    // but WOULD be filtered by mutation (which removes lower bound check)
    const promise = deferred.promise
      .then(function throwAtSmallLineNumber() {
        throw new Error("test rejection");
      })
      .fail(function captureError(e: any) {
        capturedError = e;
      });
    
    deferred.resolve("trigger");
    
    return promise.then(function verify() {
      expect(capturedError).not.toBeNull();
      // The stack should contain this test file's name
      // because the throw happens at a small line number (< qStartingLine)
      expect(capturedError.stack).toContain("testCase.test");
    });
  });
});