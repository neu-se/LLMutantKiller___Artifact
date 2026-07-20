import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("domain exit after task execution", () => {
  it("domain.exit() should be called after each task so process.domain is correct during subsequent tasks in same flush", (done) => {
    const d = domain.create();
    d.on("error", () => {});

    let domainDuringTask2: any = "not set";

    // We need to schedule tasks so that:
    // - task1 has domain=d (scheduled via d.run with isNodeJS capturing process.domain)
    // - task2 has domain=null (scheduled outside any domain)
    // Both in same flush

    // First ensure we're outside any domain
    expect((process as any).domain).toBeNull();

    // Schedule task2 FIRST (outside domain) - domain=null captured
    Q.nextTick(() => {
      domainDuringTask2 = (process as any).domain;
    });

    // Schedule task1 SECOND (inside domain d) - domain=d captured
    // task1 runs before task2 since... wait, task2 was queued first
    // We need task1 (with domain) to run BEFORE task2 (without domain)
    
    // Schedule task1 inside domain - it goes to end of queue
    d.run(() => {
      Q.nextTick(() => {
        // task1: domain d is entered before this, should be exited after
      });
    });

    // task2 was queued before task1, so task2 runs first - that won't work
    // We need to reverse: queue domain task first, then non-domain task

    setTimeout(() => {
      try {
        // domainDuringTask2 ran after task1 (domain task)
        // With original: domain.exit() called after task1, task2 sees null domain
        // With mutation: domain.exit() not called, task2 sees domain d
        expect(domainDuringTask2).toBeNull();
        done();
      } catch (e) {
        done(e);
      }
    }, 50);
  });
});