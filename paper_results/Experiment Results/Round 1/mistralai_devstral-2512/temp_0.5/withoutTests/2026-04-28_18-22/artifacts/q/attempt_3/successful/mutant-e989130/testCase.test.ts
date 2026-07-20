const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Promise inspection", () => {
  it("should correctly report pending state when promise is not resolved", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    const inspection = promise.inspect();
    expect(inspection.state).toBe("pending");
  });
});