import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domainModule from "domain";

describe("Q domain handling", () => {
  it("should exit domain after task so the next task in flush does not inherit it", async () => {
    const d = domainModule.create();
    let domainDuringSecondTask: any = undefined;
    let secondTaskRan = false;

    await new Promise<void>((outerResolve) => {
      d.run(() => {
        // Schedule first task inside domain
        Q.nextTick(function () {
          // This task runs with domain d active (domain.enter() called)
          // After this, domain.exit() should be called (original) or not (mutated)
          
          // Schedule second task from WITHIN the first task but outside domain context
          // It should NOT inherit domain d
          Q.nextTick(function () {
            domainDuringSecondTask = (process as any).domain;
            secondTaskRan = true;
            outerResolve();
          });
        });
      });
    });

    expect(secondTaskRan).toBe(true);
    // Second task was scheduled without a domain, so domain should not be d
    // Original: domain.exit() was called after first task, so domain is null
    // Mutated: domain.exit() not called, domain d is still active
    expect(domainDuringSecondTask).not.toBe(d);
  });
});