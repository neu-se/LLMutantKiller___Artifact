import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("domain exit after task execution", () => {
  it("should exit the domain after running a task so subsequent tasks are not inside the domain", (done) => {
    const d = domain.create();
    const errorsInDomain: Error[] = [];

    d.on("error", (err: Error) => {
      errorsInDomain.push(err);
    });

    // Run a promise inside the domain
    d.run(() => {
      Q.resolve(42).then(() => {
        // This task runs inside the domain
        return 42;
      });
    });

    // Queue a subsequent task outside the domain context
    // If domain.exit() is NOT called, this subsequent task will still be
    // inside the domain and errors thrown here will be caught by domain.on("error")
    // instead of propagating normally.
    Q.resolve("outside").then(() => {
      // This task should run OUTSIDE the domain.
      // If domain.exit() was not called, throwing here would be caught by the domain.
      // We can check this by verifying process.domain is null/undefined here.
      const currentDomain = (process as any).domain;
      
      // After the domain task completes and domain.exit() is called,
      // subsequent tasks should not be inside the domain
      try {
        expect(currentDomain).toBeFalsy();
        done();
      } catch (e) {
        done(e);
      }
    });

    // Give enough time for the tasks to execute
    setTimeout(() => {
      // If we reach here without done() being called, something went wrong
    }, 1000);
  });
});