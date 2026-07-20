// testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library stack trace filtering", () => {
  it("should filter Node.js internal frames from stack traces", async () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    // Add a handler that will be in the stack trace
    const result = await promise.catch((error: Error) => {
      // Check if the stack trace contains Node.js internal frames
      const hasNodeFrames = error.stack?.includes("(node.js:") || error.stack?.includes("(module.js:");
      return { hasNodeFrames };
    });

    // The original code should filter out Node.js frames, so hasNodeFrames should be false
    // The mutated code (returning false) would not filter them, so hasNodeFrames would be true
    expect(result.hasNodeFrames).toBe(false);
  });
});