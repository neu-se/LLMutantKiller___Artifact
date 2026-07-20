import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("domain exit after task execution", () => {
  it("should exit the domain after running a task so subsequent tasks are not inside the domain", (done) => {
    const d = domain.create();
    
    // Track whether domain was active during the second tick
    let domainActiveAfterFirstTask: boolean | null = null;
    
    d.run(() => {
      // Schedule a task inside the domain
      Q.nextTick(() => {
        // This task runs inside the domain
        // After this task completes, domain.exit() should be called
        // Schedule another task outside the domain context
        Q.nextTick(() => {
          // If domain.exit() was NOT called (mutant), process.domain will still be d
          // If domain.exit() WAS called (original), process.domain will be null/undefined
          domainActiveAfterFirstTask = (process.domain === d);
          
          if (domainActiveAfterFirstTask === false) {
            // Original behavior: domain was properly exited
            done();
          } else {
            // Mutant behavior: domain was NOT exited, still active
            done(new Error("Domain was not exited after task execution - domain.exit() was not called"));
          }
        });
      });
    });
    
    // Timeout fallback
    setTimeout(() => {
      if (domainActiveAfterFirstTask === null) {
        done(new Error("Test did not complete in time"));
      }
    }, 1000);
  });
});