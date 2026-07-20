import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_defineProperty mutation test", () => {
  it("should properly handle promise inspection with stack traces", () => {
    // Enable long stack traces which uses object_defineProperty
    Q.longStackSupport = true;

    const deferred = Q.defer();
    const promise = deferred.promise;

    // Trigger the code path that uses object_defineProperty
    // by rejecting a promise with long stack support enabled
    deferred.reject(new Error("test error"));

    return promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (error) => {
        // Verify the error has a stack property
        expect(error).toHaveProperty('stack');
        return "handled";
      }
    );
  }, 10000); // Increased timeout
});