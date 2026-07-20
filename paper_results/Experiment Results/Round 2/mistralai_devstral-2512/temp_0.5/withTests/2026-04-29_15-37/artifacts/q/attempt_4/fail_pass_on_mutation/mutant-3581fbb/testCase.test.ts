import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering behavior", () => {
  it("should correctly filter internal frames from stack traces", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a nested promise chain that will generate internal stack frames
    const outerPromise = Q.Promise((resolve, reject) => {
      Q.delay(1).then(() => {
        const innerError = new Error("Inner error");
        reject(innerError);
      });
    });

    try {
      await outerPromise;
    } catch (e: any) {
      const stack = e.stack || "";
      const lines = stack.split('\n');

      // Count lines that look like internal Q frames
      let internalFrameCount = 0;
      lines.forEach((line: string) => {
        if (line.includes("q.js") &&
            !line.includes("node.js") &&
            !line.includes("module.js") &&
            !line.includes("From previous event:")) {
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