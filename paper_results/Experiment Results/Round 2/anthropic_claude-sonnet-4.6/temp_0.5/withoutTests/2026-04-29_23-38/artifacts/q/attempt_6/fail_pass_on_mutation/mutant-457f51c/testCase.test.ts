import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise deprecated valueOf", () => {
  it("deferred pending promise valueOf returns the promise itself", () => {
    const deferred = Q.defer();
    const p = deferred.promise;
    // For a pending deferred promise, valueOf should return the promise
    expect(p.valueOf()).toBe(p);
  });
});