// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-215cb18/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_defineProperty mutation test", () => {
  it("should properly handle promise stack properties with object_defineProperty", () => {
    Q.longStackSupport = true;

    return Q.fcall(() => {
      const deferred = Q.defer();
      const promise = deferred.promise;

      // The promise initialization uses object_defineProperty to set stack properties
      // This happens in the defer() function when longStackSupport is enabled

      // Force the promise to have a stack trace
      try {
        throw new Error("test");
      } catch (e) {
        // The promise should have stack property defined via object_defineProperty
        expect(promise.stack).toBeDefined();
        expect(typeof promise.stack).toBe('string');

        // The stackCounter should be defined via object_defineProperty
        expect(promise.stackCounter).toBeDefined();
        expect(typeof promise.stackCounter).toBe('number');

        // In the mutated version, object_defineProperty doesn't return the object
        // which would break these property assignments
      }

      deferred.resolve("success");
      return promise;
    }).then((result) => {
      expect(result).toBe("success");
    });
  });
});