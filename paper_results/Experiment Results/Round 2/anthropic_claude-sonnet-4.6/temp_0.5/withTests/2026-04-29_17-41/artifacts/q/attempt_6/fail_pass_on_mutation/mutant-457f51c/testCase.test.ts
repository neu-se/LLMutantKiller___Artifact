import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise valueOf", () => {
  it("promise valueOf for pending promise returns the promise itself", () => {
    const deferred = Q.defer();
    const p = deferred.promise;
    expect(p.valueOf()).toBe(p);
  });
});