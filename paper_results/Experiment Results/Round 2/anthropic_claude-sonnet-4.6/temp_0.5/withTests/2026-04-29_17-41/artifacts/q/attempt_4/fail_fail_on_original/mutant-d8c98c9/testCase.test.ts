import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("domain exit after task execution", () => {
  it("should exit domain after task so a subsequent non-domain task does not run inside the domain", (done) => {
    const d = domain.create();
    d.on("error", () => {}); // prevent crashes

    // We need two tasks in the same flush:
    // 1. A task associated with domain d (domain.enter() will be called before it)
    // 2. A task with NO domain (domain.exit() from task 1 should restore null domain)
    
    // To get a task associated with domain d, we need isNodeJS=true and process.domain=d
    // The domain is captured as `process.domain` when nextTick is called
    
    // Capture what domain task 2 runs in
    let task2Domain: any = "not run";

    // Schedule task 1 inside domain d - this captures d as head.domain
    d.run(() => {
      Q.nextTick(() => {
        // task 1 body - domain d is active here
      });
    });

    // Schedule task 2 outside any domain - this captures null as head.domain
    // But we need to ensure it runs AFTER task 1 in the same flush
    // Since both are scheduled synchronously, they'll be in the same flush
    Q.nextTick(() => {
      task2Domain = (process as any).domain;
    });

    // Check after both tasks have run
    setTimeout(() => {
      try {
        // Task 2 was scheduled outside any domain, so it should run outside any domain
        // With original code: domain.exit() called after task 1, task 2 runs with null domain
        // With mutated code: domain.exit() NOT called, task 2 runs inside domain d
        expect(task2Domain).not.toBe(d);
        done();
      } catch (e) {
        done(e);
      }
    }, 100);
  });
});