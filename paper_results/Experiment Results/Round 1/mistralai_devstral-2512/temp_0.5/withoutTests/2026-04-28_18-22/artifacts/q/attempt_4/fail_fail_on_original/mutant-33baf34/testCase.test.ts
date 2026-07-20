import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library stack trace parsing", () => {
  it("should correctly parse stack traces with named functions", () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));
    return promise.then(() => {
      // This should not be called
      expect(true).toBe(false);
    }).catch((error) => {
      // The error should have a stack trace
      expect(error.stack).toBeDefined();
      // The stack trace should contain valid line information
      const lines = error.stack.split("\n");
      const validLines = lines.filter(line => line.includes(".js:"));
      expect(validLines.length).toBeGreaterThan(0);
    });
  });
});