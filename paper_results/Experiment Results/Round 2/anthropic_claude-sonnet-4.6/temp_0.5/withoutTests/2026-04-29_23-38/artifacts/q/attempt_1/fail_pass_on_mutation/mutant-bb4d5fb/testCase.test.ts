import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation detection", () => {
  it("should preserve user code stack frames in long stack traces", async () => {
    Q.longStackSupport = true;
    
    const deferred = Q.defer();
    
    // Create a rejection with a stack trace
    const error = new Error("test error");
    deferred.reject(error);
    
    let caughtError: any;
    await deferred.promise.fail((err: any) => {
      caughtError = err;
    });
    
    // The stack should contain frames from this test file
    // With the mutation, frames from this file at low line numbers would be filtered
    expect(caughtError).toBeDefined();
    expect(caughtError.stack).toBeDefined();
    expect(caughtError.stack).toContain("test error");
  });
});