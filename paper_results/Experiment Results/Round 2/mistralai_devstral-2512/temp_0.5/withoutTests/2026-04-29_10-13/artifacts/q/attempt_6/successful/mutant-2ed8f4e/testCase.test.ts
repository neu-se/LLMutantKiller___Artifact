const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("filterStackString mutation test", () => {
  it("should properly filter stack traces when long stack support is enabled", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a deeply nested promise chain to generate a complex stack trace
    const promise = Q.reject(new Error("Deep error"))
      .catch(() => {
        throw new Error("Nested error");
      });

    return promise.catch((error: Error) => {
      // The original implementation should filter internal frames
      // The mutated implementation returns empty string, which would fail this check
      expect(error.stack).toBeTruthy();
      expect(error.stack!.length).toBeGreaterThan(0);

      // Check that the stack contains our error messages
      expect(error.stack).toContain("Nested error");

      // The mutated version would return empty string, making this fail
      expect(error.stack).not.toEqual("");
    });
  });
});