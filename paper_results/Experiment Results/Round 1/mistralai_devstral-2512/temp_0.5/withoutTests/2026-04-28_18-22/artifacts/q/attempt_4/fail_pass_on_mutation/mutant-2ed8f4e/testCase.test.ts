const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("filterStackString mutation", () => {
  it("should properly filter stack traces when long stack support is enabled", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("test error"));

    // Add a handler that will be in the stack trace
    return promise.catch((error: Error) => {
      const stack = error.stack;

      // The mutation makes filterStackString return an empty string
      // which would result in an empty stack trace after concatenation
      // In the original code, the stack should contain some frames
      expect(stack).toBeDefined();
      expect(stack!.length).toBeGreaterThan(0);

      // The original filterStackString should remove internal Q frames
      // but the mutation would make the entire stack empty
      expect(stack).not.toMatch(/^\s*$/); // Should not be just whitespace
      return "recovered";
    });
  });
});