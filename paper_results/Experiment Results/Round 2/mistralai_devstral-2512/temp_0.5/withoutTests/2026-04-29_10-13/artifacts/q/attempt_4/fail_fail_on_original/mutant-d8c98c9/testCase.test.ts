const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise domain handling", () => {
  it("should properly exit domain context after task execution", (done) => {
    // Create a domain to test domain handling
    const domain = require('domain').create();
    let exitCalled = false;
    let domainActive = false;

    // Override domain.exit to track if it's called
    const originalExit = domain.exit;
    domain.exit = function() {
      exitCalled = true;
      return originalExit.apply(this, arguments);
    };

    // Override domain.enter to track if domain is active
    const originalEnter = domain.enter;
    domain.enter = function() {
      domainActive = true;
      return originalEnter.apply(this, arguments);
    };

    // Run a task in the domain context
    domain.run(() => {
      Q.nextTick(() => {
        // After the task completes, check if domain.exit was called
        setTimeout(() => {
          // In the original code, domain.exit should be called, so domainActive should be false
          // In the mutated code, domain.exit is not called, so domainActive remains true
          expect(domainActive).toBe(false);
          done();
        }, 10);
      });
    });
  });
});