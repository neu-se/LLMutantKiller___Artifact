const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise domain handling", () => {
  it("should properly exit domain context when task throws in Node.js environment", (done) => {
    // This test verifies that the domain.exit() is properly called
    // when a task throws an exception in a Node.js domain context
    const domain = require('domain').create();
    let exitCalled = false;
    let errorThrown = false;

    // Override domain.exit to track if it's called
    const originalExit = domain.exit;
    domain.exit = function() {
      exitCalled = true;
      originalExit.call(this);
    };

    // Track if error is thrown without being caught by domain
    process.on('uncaughtException', (err) => {
      errorThrown = true;
    });

    domain.run(() => {
      Q.nextTick(() => {
        throw new Error("Test error");
      });

      // Give time for the nextTick to execute
      setTimeout(() => {
        // In the original code, domain.exit() should be called and error should be caught
        // In the mutated code, domain.exit() won't be called and error might propagate differently
        if (exitCalled && !errorThrown) {
          done();
        } else {
          done(new Error("Domain exit was not called properly when task threw an error"));
        }

        // Clean up
        process.removeAllListeners('uncaughtException');
      }, 100);
    });
  });
});