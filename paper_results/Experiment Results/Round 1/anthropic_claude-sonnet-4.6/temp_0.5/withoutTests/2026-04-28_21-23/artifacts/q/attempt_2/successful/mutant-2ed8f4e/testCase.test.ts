import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
  it("should return a non-undefined stack string when long stack support processes a rejection", async () => {
    Q.longStackSupport = true;

    try {
      const error = new Error("test rejection");

      let capturedError: any = null;

      // Create a deferred promise so it gets a .stack property (requires longStackSupport)
      const deferred = Q.defer();

      const promise = deferred.promise.then(null, function (err: any) {
        capturedError = err;
      });

      deferred.reject(error);

      await promise;

      expect(capturedError).not.toBeNull();
      // With original code: filterStackString returns a joined string, so stack is a string
      // With mutated code: filterStackString returns undefined, so stack is set to undefined
      expect(capturedError.stack).not.toBeUndefined();
      expect(typeof capturedError.stack).toBe("string");
      // The stack should contain something meaningful
      expect(capturedError.stack.length).toBeGreaterThan(0);
    } finally {
      Q.longStackSupport = false;
    }
  });
});