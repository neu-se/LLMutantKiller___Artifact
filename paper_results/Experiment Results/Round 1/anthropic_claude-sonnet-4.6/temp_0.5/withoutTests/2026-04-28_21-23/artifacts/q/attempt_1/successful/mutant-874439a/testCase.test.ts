import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isRejected", () => {
  it("should return false for a pending (non-rejected) promise", () => {
    const deferred = Q.defer();
    // A pending promise is not rejected, so isRejected should return false
    expect(Q.isRejected(deferred.promise)).toBe(false);
  });
});