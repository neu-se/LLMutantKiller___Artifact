import { Q } from "./q.js";

describe("Q stack trace filtering", () => {
  it("should correctly filter stack traces", () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    // Add a handler to trigger stack trace processing
    return promise.catch((error) => {
      // The error should have a stack trace
      expect(error.stack).toBeDefined();
      // The stack trace should not be empty
      expect(error.stack.length).toBeGreaterThan(0);
      // The stack trace should not contain Q internal frames
      expect(error.stack).not.toContain("q.js");
    });
  });
});