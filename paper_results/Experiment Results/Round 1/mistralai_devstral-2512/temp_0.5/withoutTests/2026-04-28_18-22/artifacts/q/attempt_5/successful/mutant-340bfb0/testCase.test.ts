const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack traces", () => {
  it("should correctly set __minimumStackCounter__ property on error objects", (done) => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a simple rejected promise
    const deferred = Q.defer();
    setTimeout(() => {
      deferred.reject(new Error("Test error"));
    }, 0);

    // Handle the rejection
    deferred.promise.catch((error: Error) => {
      try {
        // Verify the error has the correct property
        expect(error).toHaveProperty("__minimumStackCounter__");
        expect(typeof (error as any).__minimumStackCounter__).toBe("number");
        done();
      } catch (e) {
        done(e);
      }
    });
  }, 100);
});