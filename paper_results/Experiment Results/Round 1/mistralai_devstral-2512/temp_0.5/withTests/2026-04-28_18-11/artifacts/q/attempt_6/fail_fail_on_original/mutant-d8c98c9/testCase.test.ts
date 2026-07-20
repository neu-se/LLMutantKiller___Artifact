import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("domain exit behavior", () => {
  it("should properly handle domain exit after task execution", (done) => {
    const domain = require('domain').create();
    let domainExited = false;
    let taskCompleted = false;

    domain.on('domainExit', () => {
      domainExited = true;
    });

    domain.run(() => {
      Q.nextTick(() => {
        taskCompleted = true;
        // Force an error to trigger the domain exit path
        throw new Error("test error");
      });
    });

    // Catch the error to prevent test failure
    process.on('uncaughtException', () => {});

    setTimeout(() => {
      // The task should have completed
      expect(taskCompleted).toBe(true);

      // In original code, domain should have exited due to error
      // In mutated code, domain won't exit properly
      // We'll check if domainExited is true in original code
      // but false in mutated code
      if (domainExited) {
        expect(domainExited).toBe(true);
      } else {
        fail("Domain did not exit properly");
      }
      done();
    }, 100);
  });
});