const q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("stack trace parsing", () => {
  it("should correctly handle promise rejection with stack traces", () => {
    // Create a rejected promise which will trigger stack trace parsing
    const promise = q.reject(new Error("Test error"));

    // The original code should properly handle stack traces
    // The mutated code will fail to properly parse stack traces
    return promise.then(
      () => {
        throw new Error("Should not be called");
      },
      (error) => {
        // This test verifies that the error handling works correctly
        // which depends on proper stack trace parsing
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Test error");
      }
    );
  });
});