import { Q } from "./q";

describe("Q promise domain handling", () => {
  it("should properly exit domain context when task throws in Node.js environment", (done) => {
    // This test verifies that the domain.exit() is properly called
    // when a task throws an exception in a Node.js domain context
    const domain = require('domain').create();
    let exitCalled = false;

    // Override domain.exit to track if it's called
    const originalExit = domain.exit;
    domain.exit = function() {
      exitCalled = true;
      originalExit.call(this);
    };

    domain.run(() => {
      Q.nextTick(() => {
        throw new Error("Test error");
      });

      // Give time for the nextTick to execute
      setTimeout(() => {
        // In the original code, domain.exit() should be called
        // In the mutated code, it won't be called
        if (exitCalled) {
          done();
        } else {
          done(new Error("Domain exit was not called when task threw an error"));
        }
      }, 100);
    });
  });
});