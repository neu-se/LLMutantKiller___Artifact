import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("domain exit after task execution", () => {
  it("domain.exit() restores process.domain for subsequent non-domain tasks in the same flush", (done) => {
    const d = domain.create();
    d.on("error", () => {});

    let domainDuringTask2: any = "not set";

    // Verify we start outside any domain
    const initialDomain = (process as any).domain;

    // Schedule domain task first (task1)
    d.run(() => {
      Q.nextTick(() => {
        // task1 runs with domain d entered
        // After this, domain.exit() should restore process.domain to initialDomain
      });
    });

    // Schedule non-domain task second (task2) - queued after task1
    Q.nextTick(() => {
      domainDuringTask2 = (process as any).domain;
    });

    setTimeout(() => {
      try {
        // With original: domain.exit() called after task1, process.domain restored to initialDomain
        // With mutation: domain.exit() NOT called, process.domain stays as d
        expect(domainDuringTask2).toBe(initialDomain);
        done();
      } catch (e) {
        done(e);
      }
    }, 50);
  });
});