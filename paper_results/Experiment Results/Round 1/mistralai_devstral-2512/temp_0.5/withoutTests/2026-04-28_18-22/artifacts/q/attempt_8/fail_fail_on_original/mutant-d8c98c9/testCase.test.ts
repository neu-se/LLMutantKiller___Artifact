const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise domain handling", () => {
  it("should properly handle domain context when task throws in Node.js environment", (done) => {
    // This test verifies that the domain context is properly managed
    // when a task throws an exception in a Node.js domain context
    const domain = require('domain').create();
    let exitCallCount = 0;

    // Track domain.exit calls
    const originalExit = domain.exit;
    domain.exit = function() {
      exitCallCount++;
      originalExit.call(this);
    };

    domain.run(() => {
      Q.nextTick(() => {
        throw new Error("Test error");
      });

      // Give time for the nextTick to execute
      setTimeout(() => {
        // In the original code, domain.exit should be called exactly once
        // In the mutated code, domain.exit might not be called
        if (exitCallCount === 1) {
          done();
        } else {
          done(new Error(`Domain exit not called properly. Call count: ${exitCallCount}`));
        }
      }, 100);
    });
  });
});