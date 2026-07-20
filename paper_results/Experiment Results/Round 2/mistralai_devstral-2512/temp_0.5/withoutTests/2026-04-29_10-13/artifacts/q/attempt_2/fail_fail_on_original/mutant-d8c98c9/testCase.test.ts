import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise domain handling", () => {
  it("should properly exit domain context after task execution", (done) => {
    // Create a domain to test domain handling
    const domain = require('domain').create();
    let exitCalled = false;

    // Override domain.exit to track if it's called
    const originalExit = domain.exit;
    domain.exit = function() {
      exitCalled = true;
      return originalExit.apply(this, arguments);
    };

    // Run a task in the domain context
    domain.run(() => {
      Q.nextTick(() => {
        // After the task completes, check if domain.exit was called
        setTimeout(() => {
          expect(exitCalled).toBe(true);
          done();
        }, 10);
      });
    });
  });
});