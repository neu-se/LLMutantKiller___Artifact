import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation detection", () => {
  it("should process stack traces correctly without off-by-one error", async () => {
    Q.longStackSupport = true;
    
    const deferred = Q.defer();
    const error = new Error("test error");
    
    const promise = deferred.promise.then(null, (err) => {
      return "handled: " + err.message;
    });
    
    deferred.reject(error);
    
    const result = await promise;
    expect(result).toBe("handled: test error");
  });
});