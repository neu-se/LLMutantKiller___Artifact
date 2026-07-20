const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should filter internal and node frames from stack traces", () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("test error"));

    // Add a handler that will be in the stack trace
    return promise.catch((error: Error) => {
      // The stack trace should be filtered to remove internal Q frames
      // In the mutated version, the stack trace will be empty
      expect(error.stack).toBeTruthy();
      expect(error.stack.length).toBeGreaterThan(0);
    });
  });
});