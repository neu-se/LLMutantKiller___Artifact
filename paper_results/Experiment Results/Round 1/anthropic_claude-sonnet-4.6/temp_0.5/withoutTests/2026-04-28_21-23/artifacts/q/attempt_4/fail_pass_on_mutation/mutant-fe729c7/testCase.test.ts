import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q basic promise resolution", () => {
  it("resolves a simple deferred promise", async () => {
    const deferred = Q.defer();
    deferred.resolve(42);
    const value = await deferred.promise;
    expect(value).toBe(42);
  });
});