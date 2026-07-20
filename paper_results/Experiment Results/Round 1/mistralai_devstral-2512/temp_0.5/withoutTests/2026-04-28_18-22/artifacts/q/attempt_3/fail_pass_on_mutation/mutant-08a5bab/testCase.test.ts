const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should filter internal Q frames from stack traces", async () => {
    // Create a promise chain that will generate a stack trace
    const error = new Error("Test error");
    const promise = Q.reject(error);

    try {
      await promise;
    } catch (e: any) {
      // Check that the stack trace doesn't contain Q internal frames
      expect(e.stack).not.toContain("q.js");
      expect(e.stack).not.toContain("From previous event:");
    }
  });
});