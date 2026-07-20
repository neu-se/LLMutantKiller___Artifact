import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("domain exit after task execution", () => {
  it("should not affect tasks scheduled outside the domain when domain.exit() is properly called", (done) => {
    const d = domain.create();

    // Track which domain each task runs in
    let domainOfSecondTask: any = "not yet run";

    d.on("error", () => {}); // prevent crashes

    // Schedule the domain task first
    d.run(() => {
      Q.nextTick(() => {
        // Task 1: runs inside domain d
        // After this, domain.exit() should restore the previous domain state
      });
    });

    // Schedule a task from OUTSIDE the domain - it should run outside the domain
    // With original code: domain.exit() restores state, this runs outside domain
    // With mutated code: domain.exit() not called, domain stays active, this runs inside domain
    Q.nextTick(() => {
      domainOfSecondTask = (process as any).domain;

      // With original: domainOfSecondTask should be null (outside domain)
      // With mutation: domainOfSecondTask would be d (domain not exited)
      try {
        expect(domainOfSecondTask).toBeNull();
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});