// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_defineProperty mutation test", () => {
  it("should properly define properties on error objects in long stack traces", () => {
    Q.longStackSupport = true;

    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const error = new Error("test error");

    return Q.fcall(() => {
      deferred1.resolve(deferred2.promise);
      deferred2.reject(error);
      return deferred1.promise;
    }).then(
      () => {
        throw new Error("Should have been rejected");
      },
      (err) => {
        // The error should have stack trace properties added via object_defineProperty
        expect(err).toBe(error);

        // Check that the error object has the expected properties
        // These are added using object_defineProperty in makeStackTraceLong
        const desc = Object.getOwnPropertyDescriptor(err, 'stack');
        expect(desc).toBeDefined();
        expect(desc?.configurable).toBe(true);

        // In the mutated version, object_defineProperty doesn't return the object
        // which breaks the property assignment chain
        expect(err.stack).toContain("From previous event:");
      }
    );
  });
});