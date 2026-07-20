import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deferred promise inspect", () => {
  it("should return an object with state 'pending' for an unresolved deferred promise", () => {
    const deferred = Q.defer();
    const inspected = deferred.promise.inspect();
    expect(inspected).toEqual({ state: "pending" });
    expect(inspected.state).toBe("pending");
  });
});