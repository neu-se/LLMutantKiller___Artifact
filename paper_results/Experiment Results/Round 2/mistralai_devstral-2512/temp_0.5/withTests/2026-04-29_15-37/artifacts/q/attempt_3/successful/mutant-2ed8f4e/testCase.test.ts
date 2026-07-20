import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation test", () => {
  it("should properly filter stack traces in long stack mode", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate internal stack frames
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Create a chain that will include internal Q frames
    Q.nextTick(() => {
      deferred.reject(error);
    });

    try {
      await deferred.promise;
    } catch (e: any) {
      const stack = e.stack;

      // The original implementation should filter out Q internal frames
      // The mutated implementation (empty function) should leave them in
      const hasInternalFrames = stack && (
        stack.includes("q.js") ||
        stack.includes("filterStackString") ||
        stack.includes("makeStackTraceLong")
      );

      // Original code should NOT have internal frames (they're filtered)
      // Mutated code WILL have internal frames (no filtering)
      expect(hasInternalFrames).toBe(false);
    } finally {
      Q.longStackSupport = false;
    }
  });
});