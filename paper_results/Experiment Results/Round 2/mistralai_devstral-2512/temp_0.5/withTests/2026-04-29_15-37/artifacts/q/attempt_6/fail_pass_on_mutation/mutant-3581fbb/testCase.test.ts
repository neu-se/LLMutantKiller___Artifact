import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering behavior", () => {
  it("should correctly filter internal frames from stack traces", async () => {
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

      // Look for specific internal Q functions that should be filtered
      const internalFunctions = ['filterStackString', 'makeStackTraceLong', 'captureLine'];
      let foundInternalFrame = false;

      for (const line of lines) {
        for (const func of internalFunctions) {
          if (line.includes(func) && line.includes("q.js")) {
            foundInternalFrame = true;
            break;
          }
        }
        if (foundInternalFrame) break;
      }

      // Original code filters internal frames (expect false)
      // Mutated code keeps internal frames (will be true, causing test to fail)
      expect(foundInternalFrame).toBe(false);
    } finally {
      Q.longStackSupport = false;
    }
  });
});