// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-215cb18/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_defineProperty mutation test", () => {
  it("should properly define properties when using makeStackTraceLong", () => {
    Q.longStackSupport = true;

    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const error = new Error("test error");

    // Create a promise chain that will trigger long stack trace handling
    return Q.fcall(() => {
      deferred1.resolve(deferred2.promise);
      deferred2.reject(error);
      return deferred1.promise;
    }).then(
      () => {
        throw new Error("Should have been rejected");
      },
      (err) => {
        // The error should have additional properties added via object_defineProperty
        expect(err).toBe(error);
        expect(err.stack).toBeDefined();

        // Check that the error object has the expected properties added by makeStackTraceLong
        // These properties are added using object_defineProperty
        expect(err.__minimumStackCounter__).toBeDefined();
        expect(typeof err.__minimumStackCounter__).toBe('number');

        // In the mutated version, object_defineProperty doesn't return the object
        // which would break the property assignment in makeStackTraceLong
        expect(err.stack).toContain("From previous event:");
      }
    );
  });
});