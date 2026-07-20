import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber mutation detection", () => {
  it("should handle Q.longStackSupport with stack traces without throwing", async () => {
    Q.longStackSupport = true;
    
    const deferred = Q.defer();
    deferred.resolve(42);
    
    const result = await deferred.promise.then((value) => {
      return value * 2;
    });
    
    expect(result).toBe(84);
    
    Q.longStackSupport = false;
  });
});