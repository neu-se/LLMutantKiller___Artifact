const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise domain handling", () => {
  it("should properly handle domain context when task throws in Node.js environment", (done) => {
    // This test verifies that the domain context is properly managed
    // when a task throws an exception in a Node.js domain context
    const domain = require('domain').create();
    let domainEntered = false;
    let domainExited = false;

    // Track domain enter/exit calls
    const originalEnter = domain.enter;
    const originalExit = domain.exit;

    domain.enter = function() {
      domainEntered = true;
      originalEnter.call(this);
    };

    domain.exit = function() {
      domainExited = true;
      originalExit.call(this);
    };

    domain.run(() => {
      Q.nextTick(() => {
        throw new Error("Test error");
      });

      // Give time for the nextTick to execute
      setTimeout(() => {
        // In the original code, domain should be entered and exited
        // In the mutated code, domain might be entered but not exited
        if (domainEntered && domainExited) {
          done();
        } else {
          done(new Error(`Domain context not properly managed. Entered: ${domainEntered}, Exited: ${domainExited}`));
        }
      }, 100);
    });
  });
});