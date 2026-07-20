import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domainModule from "domain";

describe("Q domain handling", () => {
  it("should call domain.exit() after running a task so domain does not leak", async () => {
    const d = domainModule.create();
    let exitCallCount = 0;

    const originalExit = d.exit.bind(d);
    d.exit = function () {
      exitCallCount++;
      return originalExit();
    };

    // Run a deferred resolution inside the domain
    await new Promise<void>((resolve) => {
      d.run(() => {
        const deferred = Q.defer();
        deferred.resolve(42);
        deferred.promise.then(function () {
          // task runs inside domain
        }).then(function () {
          resolve();
        });
      });
    });

    // After the promise chain completes, domain.exit() should have been called
    // In original code: exitCallCount > 0
    // In mutated code: exitCallCount === 0 (domain.exit() is never called)
    expect(exitCallCount).toBeGreaterThan(0);
  });
});