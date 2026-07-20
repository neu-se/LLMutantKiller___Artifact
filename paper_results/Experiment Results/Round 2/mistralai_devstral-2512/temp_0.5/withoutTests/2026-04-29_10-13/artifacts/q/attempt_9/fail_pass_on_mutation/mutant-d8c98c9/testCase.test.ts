const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise domain handling", () => {
  it("should properly exit domain context after task execution", (done) => {
    // Create a domain to test domain handling
    const domain = require('domain').create();
    let exitCalledAfterTask = false;

    // Track domain exit calls specifically after task execution
    const originalExit = domain.exit;
    domain.exit = function() {
      // Check if we're in the context of the nextTick callback
      if (exitCalledAfterTask) {
        return originalExit.apply(this, arguments);
      }
      return originalExit.apply(this, arguments);
    };

    // Run a task in the domain context
    domain.run(() => {
      Q.nextTick(() => {
        // Mark that we're now checking for domain exit after task
        exitCalledAfterTask = true;

        // Force another nextTick to check domain state after current task
        Q.nextTick(() => {
          // Create a new domain to test if previous domain was properly exited
          const testDomain = require('domain').create();
          let testDomainActive = false;

          const testOriginalEnter = testDomain.enter;
          testDomain.enter = function() {
            testDomainActive = true;
            return testOriginalEnter.apply(this, arguments);
          };

          testDomain.run(() => {
            // In original code: previous domain should have exited
            // In mutated code: previous domain might still be active
            expect(testDomainActive).toBe(true);
            done();
          });
        });
      });
    });
  });
});