import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domainModule from "domain";

describe("Q domain handling", () => {
  it("should call domain.exit() after running a task within a domain", (done) => {
    const d = domainModule.create();
    let exitCallCount = 0;

    const originalExit = d.exit.bind(d);
    d.exit = function () {
      exitCallCount++;
      return originalExit();
    };

    d.run(() => {
      // Schedule a Q task inside the domain
      Q.resolve(42).then(function () {
        // task body - runs inside domain
        return 42;
      });
    });

    // Wait long enough for the async task to complete
    setTimeout(() => {
      // In the original code, domain.exit() is called after the task runs
      // In the mutated code, domain.exit() is never called (empty if block)
      expect(exitCallCount).toBeGreaterThan(0);
      done();
    }, 200);
  });
});