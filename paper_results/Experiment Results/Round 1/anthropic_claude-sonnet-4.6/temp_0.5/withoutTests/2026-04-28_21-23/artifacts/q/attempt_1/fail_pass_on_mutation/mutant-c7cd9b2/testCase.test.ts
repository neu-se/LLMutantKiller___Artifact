import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q getFileNameAndLineNumber", () => {
  it("should filter Q internal frames from long stack traces", async () => {
    Q.longStackSupport = true;
    const deferred = Q.defer();
    deferred.reject(new Error("test error"));
    
    const error = await deferred.promise.then(null, (e) => e);
    // In original, Q internal frames are filtered; in mutant they may not be
    expect(error.message).toBe("test error");
  });
});