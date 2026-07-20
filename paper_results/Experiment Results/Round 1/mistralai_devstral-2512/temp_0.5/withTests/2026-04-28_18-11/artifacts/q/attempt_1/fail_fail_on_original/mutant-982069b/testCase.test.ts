import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
  it("should filter out internal and node frames from stack traces", async () => {
    // Create a scenario where we can observe stack filtering behavior
    const error = new Error("Test error");
    const promise = Q.reject(error);

    // Force long stack traces to be enabled for this test
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      await promise;
    } catch (e) {
      // The stack should be filtered, removing internal Q frames
      const stack = e.stack;
      expect(stack).toBeDefined();

      // In the mutated version, the loop is empty so no lines are filtered
      // In the original version, internal frames are filtered out
      // We can detect this by checking if the stack contains Q internal frames
      // The original should filter them out, the mutated version won't

      // Check if stack contains Q internal frames (which should be filtered)
      const hasInternalFrames = stack.includes("q.js") || stack.includes("From previous event");
      expect(hasInternalFrames).toBe(false);
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});