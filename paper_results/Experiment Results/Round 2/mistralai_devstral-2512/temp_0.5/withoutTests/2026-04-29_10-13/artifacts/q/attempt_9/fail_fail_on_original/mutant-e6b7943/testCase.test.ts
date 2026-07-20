const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library isStopIteration function", () => {
  it("should correctly identify StopIteration exceptions", () => {
    // Access the internal isStopIteration function through Q's async implementation
    // Create a mock StopIteration exception
    const stopIteration = { toString: () => "[object StopIteration]" };

    // Test that the original code correctly identifies this as a StopIteration
    let caughtException = null;
    try {
      Q.async(function*() {
        throw stopIteration;
      })();
    } catch (e) {
      caughtException = e;
    }

    // In the original code, StopIteration should be caught and handled
    // In the mutated code (where isStopIteration always returns true),
    // it will incorrectly catch all exceptions including StopIteration
    expect(caughtException).toBeNull();

    // Now test with a regular exception to ensure the mutation would break this
    let regularException = null;
    try {
      Q.async(function*() {
        throw new Error("regular error");
      })();
    } catch (e) {
      regularException = e;
    }

    // Regular exceptions should propagate
    expect(regularException).not.toBeNull();
    expect(regularException.message).toBe("regular error");
  });
});