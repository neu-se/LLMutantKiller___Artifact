import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
  it("should set __minimumStackCounter__ on the error to prevent duplicate stack sections", async () => {
    Q.longStackSupport = true;

    try {
      // Build a chain of promises so there are multiple source promises
      // When makeStackTraceLong is called, with original code it sets
      // __minimumStackCounter__ and only adds the first stack.
      // With the mutation it sets "" instead, so __minimumStackCounter__
      // is never set on the error object.
      
      let caughtError: Error | null = null;

      await Q()
        .then(function step1() {
          return Q().then(function step2() {
            return Q().then(function step3() {
              throw new Error("test error");
            });
          });
        })
        .catch(function (err: Error) {
          caughtError = err;
        });

      expect(caughtError).not.toBeNull();
      const err = caughtError as unknown as Error;

      // With original code, __minimumStackCounter__ is defined on the error
      // (as a non-enumerable configurable property) after makeStackTraceLong runs.
      // With the mutation, "" is set instead, so __minimumStackCounter__ is NOT defined.
      const descriptor = Object.getOwnPropertyDescriptor(err, "__minimumStackCounter__");
      expect(descriptor).toBeDefined();
    } finally {
      Q.longStackSupport = false;
    }
  });
});