import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deferred promise inspect", () => {
  it("should return pending state when promise has not been resolved", () => {
    const deferred = Q.defer();
    const inspected = deferred.promise.inspect();
    expect(inspected.state).toBe("pending");
  });
});