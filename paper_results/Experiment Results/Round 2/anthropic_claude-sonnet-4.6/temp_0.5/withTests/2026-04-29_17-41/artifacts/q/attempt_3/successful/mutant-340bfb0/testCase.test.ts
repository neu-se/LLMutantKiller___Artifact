import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
  it("sets __minimumStackCounter__ on the error object when building long stack traces", async () => {
    Q.longStackSupport = true;

    try {
      const error = new Error("test error");

      function step1() {
        const d = Q.defer();
        d.reject(error);
        return d.promise;
      }

      function step2() {
        return Q.resolve(undefined).then(() => step1());
      }

      let capturedError: unknown = null;
      await step2().catch((err: unknown) => { capturedError = err; });

      expect(capturedError).not.toBeNull();
      // With original code, __minimumStackCounter__ is set on the error.
      // With mutated code, "" is set instead, so __minimumStackCounter__ remains undefined.
      expect((capturedError as Record<string, unknown>)["__minimumStackCounter__"]).toBeDefined();
    } finally {
      Q.longStackSupport = false;
    }
  });
});