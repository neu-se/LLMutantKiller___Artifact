import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("domain exit after task execution", () => {
  it("should call domain.exit() after running a domain-bound task so subsequent tasks run outside the domain", (done) => {
    const d = domain.create();
    const domainCaughtErrors: Error[] = [];

    d.on("error", (err: Error) => {
      domainCaughtErrors.push(err);
    });

    const testError = new Error("test error from outside domain");

    // First, queue a task inside the domain
    d.run(() => {
      Q.nextTick(() => {
        // This task runs inside the domain
        // After this task completes, domain.exit() should be called (original code)
        // or NOT called (mutated code)
      });
    });

    // Queue a second task that will throw - this should run OUTSIDE the domain
    // With original code: domain.exit() was called, so this error propagates normally
    // With mutated code: domain.exit() was NOT called, so domain catches this error
    Q.nextTick(() => {
      // Schedule another task to run after the domain task
      Q.nextTick(() => {
        // With original: process.domain is null here, throwing causes uncaught exception
        // With mutation: process.domain is still 'd', domain catches the error
        const currentDomain = (process as any).domain;
        
        if (currentDomain === d) {
          // Mutation detected: domain was not exited
          done(new Error("domain was not exited after task - mutation detected"));
        } else {
          // Original behavior: domain was properly exited
          expect(domainCaughtErrors).toHaveLength(0);
          done();
        }
      });
    });
  });
});