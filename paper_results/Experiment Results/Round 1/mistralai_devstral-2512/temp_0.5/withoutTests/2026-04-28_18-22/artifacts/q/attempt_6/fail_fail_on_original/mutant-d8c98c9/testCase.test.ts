const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise domain handling", () => {
  it("should properly handle domain context when task throws in Node.js environment", (done) => {
    // This test verifies that the domain context is properly managed
    // when a task throws an exception in a Node.js domain context
    const domain = require('domain').create();
    let domainActiveDuringError = false;
    let domainActiveAfterError = false;

    // Track domain active state
    domain.run(() => {
      Q.nextTick(() => {
        // Check if domain is still active when error is thrown
        domainActiveDuringError = domain.active;

        try {
          throw new Error("Test error");
        } catch (e) {
          // Check if domain is still active after error is caught
          domainActiveAfterError = domain.active;
          throw e;
        }
      });

      // Give time for the nextTick to execute
      setTimeout(() => {
        // In the original code, domain should be active during error but not after
        // In the mutated code, domain might remain active after error
        if (domainActiveDuringError && !domainActiveAfterError) {
          done();
        } else {
          done(new Error(`Domain context not properly managed. During: ${domainActiveDuringError}, After: ${domainActiveAfterError}`));
        }
      }, 100);
    });
  });
});