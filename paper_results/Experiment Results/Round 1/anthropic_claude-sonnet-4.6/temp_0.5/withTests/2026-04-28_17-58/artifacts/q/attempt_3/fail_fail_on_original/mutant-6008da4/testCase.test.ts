import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as nodeDomain from "domain";

describe("Q nextTick domain behavior", () => {
  it("does not re-enter the scheduling domain when executing a nextTick task", (done) => {
    const d = nodeDomain.create();
    let domainDuringTask: any = "not-checked";

    d.run(() => {
      // Schedule task while inside domain d
      // Original (isNodeJS=false): stores domain=false, won't call domain.enter()
      // Mutant (isNodeJS=true): stores domain=d, will call d.enter() before task
      Q.nextTick(() => {
        domainDuringTask = process.domain;
      });
    });
    // We are now outside domain d

    setTimeout(() => {
      // Original: domainDuringTask is null (no domain.enter() called)
      // Mutant: domainDuringTask is d (domain.enter() was called)
      expect(domainDuringTask).toBeNull();
      done();
    }, 50);
  });
});