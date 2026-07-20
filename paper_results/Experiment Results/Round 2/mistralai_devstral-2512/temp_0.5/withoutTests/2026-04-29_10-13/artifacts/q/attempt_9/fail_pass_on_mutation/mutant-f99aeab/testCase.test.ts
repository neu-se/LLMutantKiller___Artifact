// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace capture", () => {
  it("should correctly filter internal stack frames when hasStacks is true", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const promise = Q.resolve()
      .then(() => {
        throw new Error("Test error");
      })
      .catch((error: Error) => {
        // The error should have a stack trace
        expect(error.stack).toBeDefined();

        // The stack should contain our error message
        expect(error.stack).toContain("Test error");

        // Check that internal Q frames are properly filtered
        // The mutation affects whether qFileName is set correctly
        // which impacts stack frame filtering
        const lines = error.stack!.split('\n');
        const hasQInternalFrame = lines.some(line =>
          line.includes('q.js') && line.includes('captureLine')
        );

        // With the mutation, internal frames won't be filtered properly
        expect(hasQInternalFrame).toBe(false);

        return error;
      });

    return promise;
  });
});