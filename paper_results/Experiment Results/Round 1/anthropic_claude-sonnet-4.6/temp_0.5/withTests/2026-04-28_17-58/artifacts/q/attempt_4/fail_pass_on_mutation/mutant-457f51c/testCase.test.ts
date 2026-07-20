import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise deprecated valueOf", () => {
  it("valueOf on a pending deferred promise returns the promise itself before resolution", () => {
    const deferred = Q.defer();
    // Before resolution, valueOf should return the promise itself
    const val = deferred.promise.valueOf();
    expect(val).toBe(deferred.promise);
  });
});