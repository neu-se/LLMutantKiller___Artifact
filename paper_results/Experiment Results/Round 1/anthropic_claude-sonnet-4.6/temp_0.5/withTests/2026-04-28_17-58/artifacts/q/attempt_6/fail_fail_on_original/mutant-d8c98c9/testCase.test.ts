import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import domain from "domain";

describe("domain exit after task execution", () => {
  it("should not route errors from non-domain tasks through a previously active domain", (done) => {
    const d = domain.create();
    let domainCaughtError = false;
    let testError = new Error("test error from non-domain task");

    d.on("error", (err: Error) => {
      if (err === testError) {
        domainCaughtError = true;
      }
    });

    // Schedule a domain task first
    d.run(() => {
      Q.nextTick(() => {
        // runs inside domain; after this domain.exit() should be called
      });
    });

    // Schedule a non-domain task second - runs in same flush after domain task
    // This task throws; if domain.exit() was NOT called, the domain catches it
    Q.nextTick(() => {
      throw testError;
    });

    setTimeout(() => {
      if (domainCaughtError) {
        // Mutant: domain.exit() not called, domain still active, caught the error
        done(new Error("Domain incorrectly caught error from non-domain task"));
      } else {
        // Original: domain.exit() called, domain no longer active
        done();
      }
    }, 200);
  });
});