const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack traces", () => {
  it("should correctly set __minimumStackCounter__ property on error objects", (done) => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a chain of promises to build up a stack
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const deferred3 = Q.defer();

    // Reject the innermost promise
    setTimeout(() => {
      deferred3.reject(new Error("Test error"));
    }, 10);

    // Build promise chain
    deferred1.promise
      .then(() => deferred2.promise)
      .then(() => deferred3.promise)
      .catch((error: Error) => {
        // Verify the error has the correct property
        expect(error).toHaveProperty("__minimumStackCounter__");
        expect(typeof (error as any).__minimumStackCounter__).toBe("number");
        done();
      });
  }, 1000);
});