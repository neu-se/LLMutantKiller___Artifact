import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("domain exit after task execution", () => {
  it("should exit domain so that process.domain is restored after the task completes", (done) => {
    const d = domain.create();
    const domainErrors: Error[] = [];
    
    d.on("error", (err: Error) => {
      domainErrors.push(err);
    });

    let domainAfterTask: any = "not set";

    // Run a task inside domain d using Q.nextTick directly
    // We simulate what happens inside flush: domain.enter() then task() then domain.exit()
    // by checking process.domain in a task scheduled AFTER the domain task completes
    
    d.run(() => {
      Q.nextTick(() => {
        // This task runs with domain d active
        // After this task, domain.exit() should be called (original)
        // or NOT called (mutation)
        
        // Schedule a check for AFTER this task's domain cleanup
        setImmediate(() => {
          domainAfterTask = (process as any).domain;
          
          try {
            // After domain.exit() is called, process.domain should be null
            // With mutation (no domain.exit()), process.domain is still d
            expect(domainAfterTask).toBeNull();
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
});