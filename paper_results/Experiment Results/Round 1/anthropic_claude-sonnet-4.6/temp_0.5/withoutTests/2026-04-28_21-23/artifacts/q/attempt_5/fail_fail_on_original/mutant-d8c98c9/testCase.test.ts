import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domainModule from "domain";

describe("Q domain handling", () => {
  it("should not have domain active in tasks scheduled outside the domain after a domain task runs", async () => {
    const d = domainModule.create();
    
    // We'll collect the active domain during each task
    const results: Array<boolean> = [];

    await new Promise<void>((outerResolve) => {
      // First: schedule a task OUTSIDE the domain
      // This task checks if domain d is incorrectly active
      const checkPromise = Q.defer();
      
      // Schedule domain task first so it runs and (should) exit the domain
      d.run(() => {
        // Schedule a task inside the domain - this will call domain.enter() then domain.exit()
        Q.nextTick(function () {
          // inside domain task
        });
      });

      // Schedule a task outside the domain that runs after the domain task
      Q.nextTick(function () {
        Q.nextTick(function () {
          // In original code: domain was exited, so process.domain is null/undefined here
          // In mutated code: domain was never exited, so process.domain is still d
          const activeDomain = (process as any).domain;
          results.push(activeDomain === d);
          outerResolve();
        });
      });
    });

    // The task scheduled outside the domain should NOT have domain d active
    expect(results[0]).toBe(false);
  });
});