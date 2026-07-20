import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
  it("should produce a non-undefined stack trace when long stack support is enabled and a rejection occurs", async () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      const error = new Error("test error");
      
      // Create a promise chain that will trigger makeStackTraceLong
      // makeStackTraceLong is called in Promise.prototype.then's _rejected function
      // when a rejected promise is handled
      const result = await Q.reject(error)
        .then(null, function (err: Error) {
          // When filterStackString works correctly, err.stack should be a non-empty string
          // When filterStackString is mutated to return undefined, err.stack will be set to undefined
          return err.stack;
        });

      // With the original code, filterStackString returns a joined string of filtered lines
      // With the mutated code, filterStackString returns undefined, so err.stack becomes undefined
      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});