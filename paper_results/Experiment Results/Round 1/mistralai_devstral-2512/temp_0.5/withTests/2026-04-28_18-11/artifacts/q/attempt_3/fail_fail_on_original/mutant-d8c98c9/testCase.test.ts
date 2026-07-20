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
        // In original code, domain.exit() should be called here
        // In mutated code, domain.exit() is missing
      });
    });

    setTimeout(() => {
      // The task should have completed
      expect(taskCompleted).toBe(true);

      // In original code, domain should have exited
      // In mutated code, domain won't exit
      expect(domainExited).toBe(true);
      done();
    }, 100);
  });
});