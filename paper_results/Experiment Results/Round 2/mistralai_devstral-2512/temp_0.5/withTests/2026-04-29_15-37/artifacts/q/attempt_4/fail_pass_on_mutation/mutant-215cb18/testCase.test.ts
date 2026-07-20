// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-215cb18/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_defineProperty mutation test", () => {
  it("should use object_defineProperty in long stack traces", () => {
    Q.longStackSupport = true;

    const deferred = Q.defer();
    const error = new Error("test error");

    return Q.fcall(() => {
      // Trigger the long stack trace mechanism which uses object_defineProperty
      deferred.reject(error);
      return deferred.promise;
    }).then(
      () => {
        throw new Error("Should have been rejected");
      },
      (err) => {
        // The error should have stack trace properties added via object_defineProperty
        expect(err).toBe(error);
        expect(err.stack).toBeDefined();
        // In the mutated version, object_defineProperty doesn't return the object
        // which breaks the long stack trace functionality
        expect(err.stack).toContain("From previous event:");
      }
    );
  });
});