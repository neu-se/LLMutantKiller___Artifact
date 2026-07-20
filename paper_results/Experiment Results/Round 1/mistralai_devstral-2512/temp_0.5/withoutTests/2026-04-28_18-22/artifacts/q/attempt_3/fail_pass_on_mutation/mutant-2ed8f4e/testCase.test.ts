const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("filterStackString mutation", () => {
  it("should filter internal and node frames from stack traces", () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("test error"));

    // Add a handler that will be in the stack trace
    const result = promise.catch((error: Error) => {
      // The stack trace should be filtered
      const stack = error.stack;
      // Check that the stack trace is not empty (mutation would make it empty)
      expect(stack).not.toBeUndefined();
      expect(stack).not.toBeNull();
      expect(stack!.length).toBeGreaterThan(0);
      // Check that it doesn't contain internal Q frames
      expect(stack).not.toContain("at filterStackString");
      expect(stack).not.toContain("at isInternalFrame");
      return "recovered";
    });

    return result;
  });
});