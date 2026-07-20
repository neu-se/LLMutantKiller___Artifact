import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q captureLine behavior", () => {
  it("should resolve a deferred promise with correct value", async () => {
    const deferred = Q.defer();
    deferred.resolve(42);
    const result = await deferred.promise;
    expect(result).toBe(42);
  });
});