import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should resolve promise even when earlier nextTick task throws", async () => {
    const deferred = Q.defer();
    
    // This task throws
    Q.nextTick(function() {
      throw new Error("intentional");
    });
    
    // This task resolves the promise - should still run
    Q.nextTick(function() {
      deferred.resolve(42);
    });
    
    const result = await deferred.promise;
    expect(result).toBe(42);
  });
});