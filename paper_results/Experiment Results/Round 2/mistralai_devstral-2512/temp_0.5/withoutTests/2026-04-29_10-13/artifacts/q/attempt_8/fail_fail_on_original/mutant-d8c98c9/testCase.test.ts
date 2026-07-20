const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise domain handling", () => {
  it("should properly exit domain context after task execution", (done) => {
    // Create a domain to test domain handling
    const domain = require('domain').create();
    let exitCallCount = 0;
    let enterCallCount = 0;

    // Track domain enter/exit calls
    const originalExit = domain.exit;
    const originalEnter = domain.enter;

    domain.exit = function() {
      exitCallCount++;
      return originalExit.apply(this, arguments);
    };

    domain.enter = function() {
      enterCallCount++;
      return originalEnter.apply(this, arguments);
    };

    // Run a task in the domain context
    domain.run(() => {
      Q.nextTick(() => {
        // After the task completes, check domain state
        setTimeout(() => {
          // In original code: domain.exit should be called once after task completes
          // In mutated code: domain.exit is never called
          expect(exitCallCount).toBe(1);
          expect(enterCallCount).toBeGreaterThan(0);
          done();
        }, 50);
      });
    });
  });
});