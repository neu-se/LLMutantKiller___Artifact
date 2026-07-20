const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should correctly filter stack traces when qFileName is properly initialized", () => {
    // Force long stack traces which requires proper initialization
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const promise = Q.resolve()
      .then(() => {
        // Create an error that will have a stack trace
        const error = new Error("Test error");
        error.stack = "Error: Test error\n" +
                     "    at test.js:10:15\n" +
                     "    at q.js:100:20\n" +
                     "    at q.js:200:30";
        throw error;
      })
      .catch((error) => {
        // The stack should be filtered to remove Q internal frames
        // This requires qFileName to be properly initialized
        expect(error.stack).toBeDefined();

        // The filtered stack should not contain Q internal frames
        // (This is the key difference - with the mutation, filtering won't work)
        const hasInternalFrames = error.stack.includes("q.js");
        expect(hasInternalFrames).toBe(false);

        return Q.resolve();
      });

    return promise;
  });
});