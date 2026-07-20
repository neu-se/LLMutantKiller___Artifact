import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace filtering", () => {
  it("should preserve frames from non-Q files with small line numbers", async () => {
    Q.longStackSupport = true;
    
    // This error is created at a small line number in this file
    const error = new Error("test");
    // error.stack contains a frame from this test file at a small line number
    
    const deferred = Q.defer();
    deferred.reject(error);
    
    let capturedStack: string = "";
    await new Promise<void>((resolve) => {
      deferred.promise.fail((err: any) => {
        capturedStack = err.stack || "";
        resolve();
      });
    });
    
    // The stack should contain a reference to this test file
    // With the mutation, frames from this file (small line numbers) get filtered out
    expect(capturedStack).toContain("testCase.test");
  });
});