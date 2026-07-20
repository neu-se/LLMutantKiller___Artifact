import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import domain from "domain";

describe("domain exit after task execution", () => {
  it("should call domain.exit() after each task that runs inside a domain", (done) => {
    const d = domain.create();
    let exitCount = 0;

    const originalExit = d.exit.bind(d);
    d.exit = function () {
      exitCount++;
      return originalExit();
    };

    // Schedule exactly one task inside the domain
    d.run(() => {
      Q.nextTick(() => {
        // task body - domain.exit() should be called after this by runSingle
      });
    });

    // After enough time for the flush to complete, check exit was called
    // We use a separate setTimeout to check after the nextTick queue drains
    const exitCountBeforeFlush = exitCount; // should be 0 here (d.run exits synchronously)

    setTimeout(() => {
      // exitCount should have increased by at least 1 due to runSingle calling domain.exit()
      if (exitCount > exitCountBeforeFlush) {
        done();
      } else {
        done(new Error(`domain.exit() was not called by runSingle: exitCount=${exitCount}, exitCountBeforeFlush=${exitCountBeforeFlush}`));
      }
    }, 100);
  });
});