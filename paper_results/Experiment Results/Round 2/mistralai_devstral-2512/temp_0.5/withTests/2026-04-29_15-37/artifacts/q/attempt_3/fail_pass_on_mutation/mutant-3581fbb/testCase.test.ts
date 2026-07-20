import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should filter internal frames but not Node.js frames", async () => {
    // Enable long stack traces to ensure filtering is tested
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const promise = Q.reject(new Error("Test error"));

    try {
      await promise;
    } catch (e: any) {
      const stack = e.stack || "";
      const lines = stack.split('\n');

      // Check for internal Q frames (should be filtered out in original)
      const hasInternalFrames = lines.some((line: string) => {
        return line.includes("q.js") &&
               !line.includes("node.js") &&
               !line.includes("module.js") &&
               !line.includes("From previous event:");
      });

      // Original code filters internal frames (expect false)
      // Mutated code keeps internal frames (will be true, causing test to fail)
      expect(hasInternalFrames).toBe(false);
    } finally {
      Q.longStackSupport = false;
    }
  });
});