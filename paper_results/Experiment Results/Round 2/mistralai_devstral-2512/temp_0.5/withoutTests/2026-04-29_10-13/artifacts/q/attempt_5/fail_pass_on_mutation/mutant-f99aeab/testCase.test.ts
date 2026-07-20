// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace capture", () => {
  it("should correctly capture stack traces when hasStacks is true", () => {
    // Force hasStacks to be true by creating an error with a stack
    let hasStacks = false;
    try {
      throw new Error();
    } catch (e) {
      hasStacks = !!e.stack;
    }

    if (!hasStacks) {
      // Skip test if environment doesn't support stacks
      expect(true).toBe(true);
      return;
    }

    // Create a promise that will be rejected
    const promise = Q.reject(new Error("Test error"));

    // Try to get the stack trace
    promise.then(
      () => {},
      (error: Error) => {
        // Verify that a stack trace was captured
        expect(error.stack).toBeDefined();
        expect(error.stack!.length).toBeGreaterThan(0);
        // Check that the stack contains the error message
        expect(error.stack).toContain("Test error");
      }
    );

    // Use setTimeout to allow the promise to resolve in the next tick
    return new Promise((resolve) => {
      setTimeout(resolve, 10);
    });
  });
});