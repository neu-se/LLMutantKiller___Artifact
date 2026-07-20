import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("domain.exit() is called after task completion", () => {
  it("should exit the domain after a promise task completes, so subsequent tasks run outside the domain", (done) => {
    const d = domain.create();
    
    // Track which domain is active during different tasks
    const domainsDuringTasks: (domain.Domain | null)[] = [];
    
    // Run the first task inside the domain
    d.run(() => {
      // Create a promise inside the domain
      const p = Q.resolve(42);
      
      // The then callback should run in the domain context
      p.then((value) => {
        domainsDuringTasks.push(process.domain as domain.Domain | null);
        return value;
      }).then(() => {
        // After the first then completes, we schedule another task
        // This second task should NOT be in the domain if domain.exit() was called
        Q.resolve("second").then(() => {
          domainsDuringTasks.push(process.domain as domain.Domain | null);
          
          // In the original code: domain.exit() is called after each task,
          // so the second task scheduled outside the domain run context
          // should not have the domain active.
          // In the mutated code: domain.exit() is never called, so the domain
          // remains active even for tasks that shouldn't be in it.
          
          // The first task ran inside the domain, so process.domain should be d
          expect(domainsDuringTasks[0]).toBe(d);
          
          // After domain.exit() is called (original code), subsequent tasks
          // scheduled outside the domain should not have process.domain === d
          // In mutated code, domain is never exited so it stays active
          expect(domainsDuringTasks[1]).not.toBe(d);
          
          done();
        });
      });
    });
    
    // Schedule a task outside the domain - this should run without the domain
    // But in mutated code, since domain.exit() is never called, the domain
    // might still be active
    Q.resolve("outside").then(() => {
      domainsDuringTasks.push(process.domain as domain.Domain | null);
    });
  });
});