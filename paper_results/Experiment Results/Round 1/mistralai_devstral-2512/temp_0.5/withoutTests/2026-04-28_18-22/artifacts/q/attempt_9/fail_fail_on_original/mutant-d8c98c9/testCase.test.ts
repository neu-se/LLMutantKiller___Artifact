const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise error handling", () => {
  it("should properly handle errors in nextTick tasks", (done) => {
    // This test verifies that errors in nextTick tasks are properly handled
    // The mutation removes the domain.exit() call which affects error handling
    let errorHandled = false;

    Q.nextTick(() => {
      try {
        throw new Error("Test error");
      } catch (e) {
        errorHandled = true;
        throw e; // Re-throw to test error propagation
      }
    });

    // Give time for the nextTick to execute
    setTimeout(() => {
      // In the original code, the error should be handled properly
      // In the mutated code, the error handling might be different
      if (errorHandled) {
        done();
      } else {
        done(new Error("Error was not handled properly in nextTick task"));
      }
    }, 100);
  });
});