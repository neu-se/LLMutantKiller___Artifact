import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deferred promise inspect", () => {
  it("should return state 'pending' when inspecting an unresolved deferred promise", () => {
    const deferred = Q.defer();
    const inspected = deferred.promise.inspect();
    expect(inspected.state).toBe("pending");
  });
});