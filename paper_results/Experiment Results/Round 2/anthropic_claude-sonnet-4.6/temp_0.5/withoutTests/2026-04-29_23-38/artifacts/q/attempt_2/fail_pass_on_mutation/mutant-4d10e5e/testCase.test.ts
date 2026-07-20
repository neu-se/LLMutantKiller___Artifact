import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q basic functionality", () => {
  it("resolves a deferred promise with the correct value", async () => {
    const deferred = Q.defer();
    deferred.resolve(42);
    const value = await deferred.promise;
    expect(value).toBe(42);
  });
});