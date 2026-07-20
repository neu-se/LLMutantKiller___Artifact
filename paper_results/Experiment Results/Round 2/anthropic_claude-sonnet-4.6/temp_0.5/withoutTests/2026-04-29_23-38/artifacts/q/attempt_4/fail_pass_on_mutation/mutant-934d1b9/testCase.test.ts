import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.defer resolve guard", () => {
  it("should not throw when resolve is called multiple times", async () => {
    const deferred = Q.defer();
    deferred.resolve(1);
    
    // In mutated code, calling resolve again will call become() again,
    // which calls array_reduce(messages, ...) where messages is now void 0
    // This should cause an error in the mutated code
    let errorThrown = false;
    try {
      deferred.resolve(2);
    } catch (e) {
      errorThrown = true;
    }
    
    expect(errorThrown).toBe(false);
    const value = await deferred.promise;
    expect(value).toBe(1);
  });
});