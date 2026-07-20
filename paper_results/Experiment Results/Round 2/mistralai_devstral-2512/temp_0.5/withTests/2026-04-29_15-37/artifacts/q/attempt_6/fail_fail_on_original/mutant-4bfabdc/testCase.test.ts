import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString behavior", () => {
  it("should correctly filter stack traces with internal frames when long stack support is enabled", () => {
    // Enable long stack traces to trigger the filtering logic
    Q.longStackSupport = true;

    // Create a promise chain that will generate a stack trace with internal frames
    const testPromise = Q.Promise((resolve: any, reject: any) => {
      setTimeout(() => {
        const error = new Error("Test error");
        // Create a stack trace that includes internal frames
        error.stack = [
          "Error: Test error",
          "    at /test/file.js:10:5", // Regular frame - should be kept
          "    at q.js:123:4", // Internal frame - should be filtered
          "    at /test/file.js:20:7" // Regular frame - should be kept
        ].join("\n");
        reject(error);
      }, 0);
    });

    return testPromise.then(
      () => {
        throw new Error("Should have been rejected");
      },
      (error: Error) => {
        // The stack should be filtered to remove internal frames
        const filteredStack = error.stack;

        // Check that internal frames (q.js) are removed
        expect(filteredStack).not.toContain("q.js:123:4");

        // Check that regular frames are preserved
        expect(filteredStack).toContain("/test/file.js:10:5");
        expect(filteredStack).toContain("/test/file.js:20:7");
      }
    );
  });
});