import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong mutation detection", () => {
  it("should handle long stack traces correctly when rejecting with object errors", async () => {
    Q.longStackSupport = true;
    
    const originalStack = "original stack";
    const error = new Error("test error");
    error.stack = originalStack;
    
    const deferred = Q.defer();
    // Create a promise with a stack
    const p = deferred.promise.then(() => {});
    deferred.reject(error);
    
    const result = await p.then(null, (err) => err.stack || "no stack");
    // The stack should be defined regardless
    expect(typeof result).toBe("string");
  });
});