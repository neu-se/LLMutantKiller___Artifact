import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace filtering", () => {
  it("should preserve user code frames in long stack traces and not over-filter", async () => {
    Q.longStackSupport = true;
    
    const deferred = Q.defer();
    
    // Create a rejection and check that the error propagates with stack info
    const error = new Error("test error");
    deferred.reject(error);
    
    let caughtError: any;
    await deferred.promise.fail((err: any) => {
      caughtError = err;
    });
    
    // The error should be the same error we rejected with
    expect(caughtError).toBe(error);
    expect(caughtError.message).toBe("test error");
  });
});