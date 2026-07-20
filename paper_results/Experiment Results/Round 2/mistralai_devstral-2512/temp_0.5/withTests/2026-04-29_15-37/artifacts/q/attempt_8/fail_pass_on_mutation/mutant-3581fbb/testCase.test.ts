import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering behavior", () => {
  it("should correctly filter internal frames from stack traces", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate internal stack frames
    const promise = Q.Promise((resolve, reject) => {
      reject(new Error("Test error"));
    });

    try {
      await promise;
    } catch (e: any) {
      const stack = e.stack || "";
      const lines = stack.split('\n');

      // Count lines that are internal Q frames (should be filtered)
      let internalFrameCount = 0;
      lines.forEach((line: string) => {
        if (line.includes("q.js") &&
            !line.includes("node.js") &&
            !line.includes("module.js") &&
            !line.includes("From previous event:") &&
            !line.includes("at Object.") &&
            !line.includes("at new Promise")) {
          internalFrameCount++;
        }
      });

      // Original code should filter out internal frames (count should be 0)
      // Mutated code will keep internal frames (count will be > 0)
      expect(internalFrameCount).toBe(0);
    } finally {
      Q.longStackSupport = false;
    }
  });
});