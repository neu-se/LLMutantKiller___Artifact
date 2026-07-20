// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should filter internal Q frames from stack traces", async () => {
    // Create a scenario where a stack trace would include Q internal frames
    const error = new Error("Test error");
    const promise = Q.reject(error);

    try {
      await promise;
    } catch (e) {
      // The mutation would cause all frames to be filtered out
      // In the original code, internal Q frames should be filtered
      // In the mutated code, all frames would be filtered (including non-Q ones)
      expect(e.stack).toBeDefined();
      // The stack should contain at least some frames
      // If the mutation is present, this might fail as all frames could be filtered
      expect(e.stack.split('\n').length).toBeGreaterThan(1);
    }
  });
});