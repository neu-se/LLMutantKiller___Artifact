import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly handle long stack traces without crashing", async () => {
    Q.longStackSupport = true;
    const deferred = Q.defer();
    deferred.resolve(42);
    const result = await deferred.promise;
    expect(result).toBe(42);
  });
});