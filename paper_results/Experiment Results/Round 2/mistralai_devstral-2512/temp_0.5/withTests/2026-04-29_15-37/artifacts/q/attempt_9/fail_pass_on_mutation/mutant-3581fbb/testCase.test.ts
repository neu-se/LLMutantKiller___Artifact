import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should filter internal frames but not Node.js frames", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise that will generate internal stack frames
    const promise = Q.Promise((resolve, reject) => {
      reject(new Error("Test error"));
    });

    try {
      await promise;
    } catch (e: any) {
      const stack = e.stack || "";
      const lines = stack.split('\n');

      // Look for specific patterns that indicate internal Q frames
      const hasInternalFrames = lines.some((line: string) => {
        return (line.includes("q.js") && line.includes("filterStackString")) ||
               (line.includes("q.js") && line.includes("makeStackTraceLong")) ||
               (line.includes("q.js") && line.includes("captureLine"));
      });

      // Original code filters internal frames (expect false)
      // Mutated code keeps internal frames (will be true, causing test to fail)
      expect(hasInternalFrames).toBe(false);
    } finally {
      Q.longStackSupport = false;
    }
  });
});