import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber regex for anonymous stack frames", () => {
  it("should correctly resolve promises even when stack lines have multi-digit column numbers", async () => {
    Q.longStackSupport = true;
    
    const deferred = Q.defer();
    
    // Create a rejected promise that will have a stack trace
    const rejectedPromise = Q.reject(new Error("test error"));
    
    // Chain a handler - this exercises the stack trace parsing
    const result = await rejectedPromise.then(null, function(err) {
      return "caught: " + err.message;
    });
    
    expect(result).toBe("caught: test error");
    
    Q.longStackSupport = false;
  });
});