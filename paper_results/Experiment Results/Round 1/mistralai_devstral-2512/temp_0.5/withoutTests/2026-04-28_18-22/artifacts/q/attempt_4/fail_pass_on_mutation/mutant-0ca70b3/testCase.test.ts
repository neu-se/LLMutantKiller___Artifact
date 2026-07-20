const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q stack trace filtering", () => {
  it("should correctly filter stack traces by removing internal frames", () => {
    // Create a promise that will generate a stack trace with internal frames
    const promise = Q.reject(new Error("Test error"));

    // Force long stack traces to be enabled
    Q.longStackSupport = true;

    // Add a rejection handler to trigger stack trace processing
    return promise.catch((error: Error) => {
      // The error should have a stack trace
      expect(error.stack).toBeDefined();

      // Count how many lines contain "q.js" (internal frames)
      const lines = error.stack?.split("\n") || [];
      const internalFrameCount = lines.filter((line: string) =>
        line.includes("q.js")
      ).length;

      // In the original code, internal frames should be filtered out (count should be low)
      // In the mutated code, the loop condition is wrong (i >= lines.length), so no filtering occurs
      // This means the mutated version will have many more internal frames visible
      expect(internalFrameCount).toBeLessThan(5);
    });
  });
});