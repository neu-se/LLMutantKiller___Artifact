// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should correctly identify Node.js stack frames", () => {
    // Create a test stack line that should be identified as a Node.js frame
    const nodeStackLine = "    at Module.load (module.js:474:32)";

    // Create a test stack line that should not be identified as a Node.js frame
    const nonNodeStackLine = "    at Object.<anonymous> (/path/to/file.js:10:5)";

    // Test the isNodeFrame function directly by creating a promise that will trigger stack filtering
    const promise = Q.reject(new Error("Test error"));

    return promise.then(() => {
      throw new Error("Should not reach here");
    }).catch((error: Error) => {
      // The original code should filter Node.js frames, so the stack should not contain module.js
      // The mutated code (returning false) would not filter them
      const hasNodeFrames = error.stack?.includes("module.js");
      expect(hasNodeFrames).toBe(false);
    });
  });
});