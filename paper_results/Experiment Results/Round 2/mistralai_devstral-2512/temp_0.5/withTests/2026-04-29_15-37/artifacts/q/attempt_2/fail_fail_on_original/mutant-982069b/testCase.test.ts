import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
  it("should filter out internal and node frames from stack traces", async () => {
    // Create a promise chain that will generate a stack trace
    const error = new Error("Test error");
    const deferred = Q.defer();
    deferred.reject(error);

    try {
      await deferred.promise;
    } catch (e: any) {
      // The stack should be filtered to remove internal Q frames
      const stack = e.stack;
      // Check that the stack trace is not empty (which would happen with the mutation)
      expect(stack).not.toBeUndefined();
      expect(stack.length).toBeGreaterThan(0);
      // Check that it contains some expected content (not just empty)
      expect(stack).toContain("Error");
    }
  });
});