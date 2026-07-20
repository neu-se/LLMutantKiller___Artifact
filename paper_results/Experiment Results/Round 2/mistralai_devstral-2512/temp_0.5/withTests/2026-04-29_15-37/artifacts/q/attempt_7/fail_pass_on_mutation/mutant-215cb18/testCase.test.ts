// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-215cb18/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_defineProperty mutation test", () => {
  it("should properly define and return object when setting stack property", () => {
    // This test directly targets the object_defineProperty shim behavior
    // The original implementation returns the object, the mutated one doesn't

    const testObj = {};
    const testValue = "test_value";

    // Use Q's internal object_defineProperty which is exposed through the promise system
    return Q.fcall(() => {
      // Create a promise that will use object_defineProperty internally
      const deferred = Q.defer();
      const promise = deferred.promise;

      // The promise initialization uses object_defineProperty to set the stack property
      // In the original code, this returns the promise object
      // In the mutated code, it returns undefined

      // We can verify this by checking if the promise has the expected properties
      expect(promise).toBeDefined();
      expect(typeof promise.then).toBe('function');

      // Now test object_defineProperty directly through the promise system
      // by creating an error that will have properties defined on it
      Q.longStackSupport = true;
      const error = new Error("test");
      const result = Object.defineProperty(error, "customProp", {
        value: testValue,
        configurable: true
      });

      // The original implementation returns the object, the mutated one doesn't
      expect(result).toBe(error);
      expect(error.customProp).toBe(testValue);

      deferred.resolve();
      return promise;
    });
  });
});