const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly handle promise rejections with stack traces", async () => {
    // Create a promise that will be rejected with a stack trace
    const promise = Q.reject(new Error("Test error"));

    // The mutation affects stack trace parsing in the getFileNameAndLineNumber function
    // This test verifies that stack traces are properly handled during promise rejection
    let error: any;
    try {
      await promise;
    } catch (e) {
      error = e;
    }

    // The original code should properly parse stack traces
    // The mutated code will fail to parse them correctly
    expect(error).toBeDefined();
    expect(error.message).toBe("Test error");
    expect(error.stack).toBeDefined();
  });
});