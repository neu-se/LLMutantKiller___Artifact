const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("hasStacks mutation test", () => {
  it("should not filter stack traces when hasStacks is false", async () => {
    // Create a promise chain that will reject with an error
    const deferred = Q.defer();

    // With hasStacks=false, stack traces should remain unfiltered
    // With hasStacks=true, the library will filter internal Q frames
    deferred.reject(new Error("Test error"));

    try {
      await deferred.promise;
      fail("Should have thrown an error");
    } catch (error) {
      // Check if the stack trace contains Q internal frames
      // With hasStacks=false, it should contain them
      // With hasStacks=true, they would be filtered out
      const stack = error.stack;
      const hasQFrames = stack && stack.includes("q.js");

      // Original code (hasStacks=false) should keep Q frames in stack
      // Mutated code (hasStacks=true) would filter them out
      expect(hasQFrames).toBe(true);
    }
  });
});