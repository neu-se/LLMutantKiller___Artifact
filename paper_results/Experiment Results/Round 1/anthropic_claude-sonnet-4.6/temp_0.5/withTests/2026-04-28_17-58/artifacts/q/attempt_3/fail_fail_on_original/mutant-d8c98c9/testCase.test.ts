import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import domain from "domain";

describe("domain exit after task execution", () => {
  it("should not have an active domain when running a task that was not scheduled within a domain", (done) => {
    const d = domain.create();

    // First, schedule a task OUTSIDE the domain
    // This will be queued second, so it runs after the domain task
    // At this point flushing hasn't started yet
    d.run(() => {
      // Schedule domain task first (it goes into the queue first)
      Q.nextTick(() => {
        // This task runs inside the domain
        // After this, domain.exit() should be called (original)
        // or NOT called (mutant)
      });
    });

    // Schedule a non-domain task second (runs after the domain task in same flush)
    Q.nextTick(() => {
      // In original: domain.exit() was called, so process.domain should be null here
      // In mutant: domain.exit() was NOT called, so process.domain is still d
      const currentDomain = (process as any).domain;
      if (currentDomain === d) {
        done(new Error("process.domain is still set to d - domain.exit() was not called"));
      } else {
        done();
      }
    });
  });
});