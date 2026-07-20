import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation test", () => {
  it("should filter internal and node frames from stack traces", () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    // Add a handler that will be part of the stack trace
    return promise.catch((error: Error) => {
      // The original implementation should filter out internal Q frames
      // The mutated implementation returns an empty string, which would break this
      expect(error.stack).toBeTruthy();
      expect(error.stack!.length).toBeGreaterThan(0);
      expect(error.stack).not.toContain("at Promise");
      expect(error.stack).not.toContain("at Q.");
    });
  });
});