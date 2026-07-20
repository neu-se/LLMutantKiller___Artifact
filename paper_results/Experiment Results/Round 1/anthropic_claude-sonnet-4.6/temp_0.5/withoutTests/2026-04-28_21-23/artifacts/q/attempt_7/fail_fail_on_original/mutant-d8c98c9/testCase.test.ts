import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domainModule from "domain";

describe("Q domain handling", () => {
  it("should exit domain after task so a pre-scheduled non-domain task does not inherit it", async () => {
    const d = domainModule.create();
    const executionOrder: string[] = [];
    const domainsDuring: any[] = [];

    await new Promise<void>((outerResolve) => {
      // Schedule domain task FIRST (it will run first in the flush)
      d.run(() => {
        Q.nextTick(function () {
          executionOrder.push("domain-task");
          // domain.exit() should be called after this in original
        });
      });

      // Schedule non-domain task SECOND (no domain active when scheduling)
      // process.domain is null here, so head.domain = null for this task
      Q.nextTick(function () {
        executionOrder.push("non-domain-task");
        domainsDuring.push((process as any).domain);
        outerResolve();
      });
    });

    expect(executionOrder).toEqual(["domain-task", "non-domain-task"]);
    // Non-domain task should NOT have domain d active
    // Original: domain.exit() called after domain task, so null here
    // Mutated: domain never exited, so d is still active here
    expect(domainsDuring[0]).not.toBe(d);
  });
});