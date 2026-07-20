import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise creation", () => {
  it("should create and resolve a deferred promise", async () => {
    const deferred = Q.defer();
    deferred.resolve(42);
    const value = await deferred.promise;
    expect(value).toBe(42);
  });
});