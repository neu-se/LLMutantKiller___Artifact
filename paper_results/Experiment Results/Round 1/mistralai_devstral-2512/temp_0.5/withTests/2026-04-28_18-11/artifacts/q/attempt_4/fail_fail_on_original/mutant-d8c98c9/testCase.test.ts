import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("domain exit behavior", () => {
  it("should properly exit domain after task execution", (done) => {
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

    setTimeout(() => {
      // The task should have completed
      expect(taskCompleted).toBe(true);

      // In original code, domain should have exited due to error
      // In mutated code, domain won't exit properly
      expect(domainExited).toBe(true);
      done();
    }, 100);
  });
});