import * as nodeDomain from "domain";
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick domain handling", () => {
  it("should exit domain after running a task so subsequent tasks run without the domain", async () => {
    const d = nodeDomain.create();
    
    let domainDuringSecondTask: NodeJS.Domain | null | undefined = undefined;
    
    await new Promise<void>((resolve, reject) => {
      // Schedule a task inside the domain
      d.run(() => {
        Q.nextTick(function firstTask() {
          // first task runs in domain d
        });
      });
      
      // Schedule a second task OUTSIDE the domain - it should NOT run in domain d
      // In original: after firstTask, domain.exit() is called, so process.domain is cleared
      // In mutated: domain.exit() is NOT called, so process.domain remains d
      // But we need to schedule this second task after the first one...
      // The second task needs to be queued after the first
      
      // We can use a Q promise that resolves after the first task
      // Actually, let's use a different approach: schedule via setTimeout after Q flushes
      
      setTimeout(function() {
        // This runs after Q has flushed its queue
        // In original: process.domain should be null (domain was exited)
        // In mutated: process.domain is still d (domain was never exited)
        try {
          domainDuringSecondTask = process.domain;
          expect(domainDuringSecondTask).not.toBe(d);
          resolve();
        } catch(e) {
          reject(e);
        }
      }, 50);
    });
  });
});