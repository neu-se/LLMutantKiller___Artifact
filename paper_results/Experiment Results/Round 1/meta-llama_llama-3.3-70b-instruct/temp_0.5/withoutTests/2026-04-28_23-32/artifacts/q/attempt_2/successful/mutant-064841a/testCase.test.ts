import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
  it("should include the stack trace in the promise when Q.longStackSupport is enabled", () => {
    Q.longStackSupport = true;
    const deferred = Q.defer();
    const promise = deferred.promise;
    deferred.reject(new Error());
    expect(promise.stack).toBeDefined();
  });
});