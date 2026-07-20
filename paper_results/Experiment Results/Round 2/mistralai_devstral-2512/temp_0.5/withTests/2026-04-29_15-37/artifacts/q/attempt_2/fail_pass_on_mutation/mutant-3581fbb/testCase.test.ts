import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering behavior", () => {
  it("should correctly filter internal frames from stack traces", async () => {
    // Create a promise chain that will generate stack traces
    const deferred = Q.defer();

    // Force stack trace generation by rejecting with an error
    const error = new Error("Test error");
    deferred.reject(error);

    try {
      await deferred.promise;
    } catch (e: any) {
      const stack = e.stack || "";
      const lines = stack.split('\n');

      // Check that internal Q frames are filtered out
      // The mutation changes the condition from !isNodeFrame to isNodeFrame
      // which means internal frames should NOT be filtered in the mutated version
      const hasInternalFrames = lines.some((line: string) => {
        return line.includes("q.js") &&
               !line.includes("node.js") &&
               !line.includes("module.js") &&
               !line.includes("From previous event:");
      });

      // Original code should filter out internal frames (hasInternalFrames = false)
      // Mutated code should keep internal frames (hasInternalFrames = true)
      expect(hasInternalFrames).toBe(false);
    }
  });
});