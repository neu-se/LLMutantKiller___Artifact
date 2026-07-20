import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
  it("should correctly set __minimumStackCounter__ property on error", () => {
    Q.longStackSupport = true;
    const error = new Error("test error");
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Create a chain of promises to trigger long stack trace handling
    const promise1 = Q.reject(error);
    const promise2 = promise1.then(() => {
      throw error;
    });
    const promise3 = promise2.then(() => {
      throw error;
    });

    return promise3.then(
      () => {
        throw new Error("Should not reach here");
      },
      (err: Error) => {
        expect(err).toBe(error);
        // Check if the __minimumStackCounter__ property exists and is configurable
        const descriptor = Object.getOwnPropertyDescriptor(err, "__minimumStackCounter__");
        expect(descriptor).toBeDefined();
        if (descriptor) {
          expect(descriptor.configurable).toBe(true);
          expect(descriptor.value).toBeDefined();
        }
        return Q.resolve(undefined);
      }
    ).finally(() => {
      Q.longStackSupport = false;
    });
  });
});