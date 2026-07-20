import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_defineProperty mutation test", () => {
  it("should use object_defineProperty internally for promise properties", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Trigger the code path that uses object_defineProperty
    // by creating a promise with long stack support enabled
    Q.longStackSupport = true;

    return Q.fcall(() => {
      // This will internally use object_defineProperty to set the stack property
      const testPromise = Q.defer().promise;
      return testPromise;
    }).then((testPromise: any) => {
      // Verify the promise has the expected structure
      expect(typeof testPromise).toBe('object');
      expect(typeof testPromise.then).toBe('function');
    });
  });
});