import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support behavior", () => {
  it("should attach stack traces to deferred promises when longStackSupport is enabled", () => {
    Q.longStackSupport = true;
    const deferred = Q.defer();
    // When longStackSupport is true, the promise gets a .stack property
    expect(typeof deferred.promise.stack).toBe("string");
  });
});