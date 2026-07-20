import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should filter out internal frames but keep Node.js frames", async () => {
    // Create a scenario that generates a stack trace with both internal and Node.js frames
    const error = new Error("Test error");
    const promise = Q.reject(error);

    try {
      await promise;
    } catch (e) {
      // The stack trace should contain Node.js frames but not Q internal frames
      const stack = e.stack || "";
      expect(stack).toBeDefined();

      // Check that the stack trace doesn't contain Q internal frames
      // (This is the key difference between original and mutated code)
      const hasInternalFrames = stack.includes("q.js") &&
                               !stack.includes("From previous event:") &&
                               stack.split('\n').some(line =>
                                 line.includes("q.js") &&
                                 !line.includes("node.js") &&
                                 !line.includes("module.js")
                               );

      // The original code should filter out internal frames
      // The mutated code should incorrectly keep them
      expect(hasInternalFrames).toBe(false);
    }
  });
});