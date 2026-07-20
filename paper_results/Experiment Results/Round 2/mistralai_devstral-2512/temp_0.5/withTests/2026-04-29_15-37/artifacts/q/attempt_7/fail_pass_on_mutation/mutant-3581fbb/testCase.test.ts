import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should filter internal frames but not Node.js frames", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const deferred = Q.defer();
    const error = new Error("Test error");
    deferred.reject(error);

    try {
      await deferred.promise;
    } catch (e: any) {
      const stack = e.stack || "";
      const lines = stack.split('\n');

      // Check for internal Q frames that should be filtered
      const hasInternalFrames = lines.some((line: string) => {
        return line.includes("q.js") &&
               !line.includes("node.js") &&
               !line.includes("module.js") &&
               !line.includes("From previous event:") &&
               !line.includes("at Object.");
      });

      // Original code filters internal frames (expect false)
      // Mutated code keeps internal frames (will be true, causing test to fail)
      expect(hasInternalFrames).toBe(false);
    } finally {
      Q.longStackSupport = false;
    }
  });
});