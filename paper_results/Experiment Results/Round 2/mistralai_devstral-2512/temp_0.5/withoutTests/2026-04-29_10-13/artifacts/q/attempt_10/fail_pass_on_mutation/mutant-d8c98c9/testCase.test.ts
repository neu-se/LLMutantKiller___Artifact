const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise domain handling", () => {
  it("should properly exit domain context after task execution", (done) => {
    // Create a domain to test domain handling
    const domain = require('domain').create();
    let domainExited = false;

    // Track domain exit
    const originalExit = domain.exit;
    domain.exit = function() {
      domainExited = true;
      return originalExit.apply(this, arguments);
    };

    // Run a task in the domain context
    domain.run(() => {
      Q.nextTick(() => {
        // After the task completes, check if domain was exited
        Q.nextTick(() => {
          // In original code: domain.exit should have been called
          // In mutated code: domain.exit is never called
          expect(domainExited).toBe(true);
          done();
        });
      });
    });
  });
});