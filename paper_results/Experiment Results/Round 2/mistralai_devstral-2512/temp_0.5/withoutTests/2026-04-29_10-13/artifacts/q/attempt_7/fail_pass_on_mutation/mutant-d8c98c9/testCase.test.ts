const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise domain handling", () => {
  it("should properly exit domain context after task execution", (done) => {
    // Create a domain to test domain handling
    const domain = require('domain').create();
    let domainExitCalled = false;
    let domainEnterCalled = false;

    // Track domain enter/exit calls
    const originalExit = domain.exit;
    const originalEnter = domain.enter;

    domain.exit = function() {
      domainExitCalled = true;
      return originalExit.apply(this, arguments);
    };

    domain.enter = function() {
      domainEnterCalled = true;
      return originalEnter.apply(this, arguments);
    };

    // Run a task in the domain context
    domain.run(() => {
      Q.nextTick(() => {
        // After the task completes, check domain state
        setTimeout(() => {
          // In original code: domain.exit should be called after task completes
          // In mutated code: domain.exit is never called
          expect(domainExitCalled).toBe(true);
          expect(domainEnterCalled).toBe(true);
          done();
        }, 50);
      });
    });
  });
});