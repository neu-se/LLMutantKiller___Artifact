import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeNodeResolver", () => {
  it("should reject the promise when the callback is called with an error", async () => {
    const deferred = Q.defer();
    const callback = deferred.makeNodeResolver();
    const error = new Error("test error");
    
    callback(error);
    
    return deferred.promise.then(
      () => {
        throw new Error("Expected promise to be rejected, but it was fulfilled");
      },
      (reason: Error) => {
        expect(reason).toBe(error);
      }
    );
  });
});