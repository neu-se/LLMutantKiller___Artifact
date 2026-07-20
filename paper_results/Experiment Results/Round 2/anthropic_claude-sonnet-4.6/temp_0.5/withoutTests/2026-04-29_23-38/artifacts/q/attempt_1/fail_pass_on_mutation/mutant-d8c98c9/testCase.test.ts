import * as domain from "domain";
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("domain.exit() is called after task execution", () => {
  it("should exit the domain after running a task via Q promise resolution", async () => {
    // We need to verify that domain.exit() is called after task execution.
    // If domain.exit() is NOT called (mutated code), the domain remains active
    // after the task runs, meaning subsequent code still runs in the domain context.
    
    const d = domain.create();
    const exitCalls: number[] = [];
    const originalExit = d.exit.bind(d);
    
    // Track exit calls
    d.exit = function() {
      exitCalls.push(Date.now());
      return originalExit();
    };
    
    let taskRanInDomain = false;
    let afterTaskDomain: domain.Domain | null = null;
    
    return new Promise<void>((resolve, reject) => {
      d.run(() => {
        // Inside the domain, create a Q promise
        const deferred = Q.defer();
        
        // Schedule a task via Q that will run in the domain context
        Q.nextTick(function() {
          taskRanInDomain = (process.domain === d);
          deferred.resolve(42);
        });
        
        deferred.promise.then(function(value) {
          // After the domain task runs and domain.exit() should have been called,
          // check if we're still in the domain
          // In the original code: domain.exit() is called, so subsequent ticks
          // should not be in the domain
          // In mutated code: domain.exit() is NOT called, domain stays active
          afterTaskDomain = process.domain as domain.Domain | null;
          resolve();
        }).catch(reject);
      });
      
      // After d.run() completes, we're outside the domain
      // The Q tasks scheduled inside will run in the domain context
      // After each task, domain.exit() should be called
    }).then(() => {
      // In original code: domain.exit() is called after the nextTick task runs
      // This means exitCalls should have been recorded
      // In mutated code: domain.exit() is never called, so exitCalls remains empty
      expect(exitCalls.length).toBeGreaterThan(0);
    });
  });
});