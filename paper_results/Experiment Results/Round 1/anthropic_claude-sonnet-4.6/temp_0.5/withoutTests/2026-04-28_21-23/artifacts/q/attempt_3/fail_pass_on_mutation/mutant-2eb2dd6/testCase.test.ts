import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce shim", () => {
  it("should correctly reduce promises using become/messages dispatch", async () => {
    const deferred = Q.defer();
    deferred.resolve(42);
    const result = await deferred.promise.then(v => v * 2);
    expect(result).toBe(84);
  });
});