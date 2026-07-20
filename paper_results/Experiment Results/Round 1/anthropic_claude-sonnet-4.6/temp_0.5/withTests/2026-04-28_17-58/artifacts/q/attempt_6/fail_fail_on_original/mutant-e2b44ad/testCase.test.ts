import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("Promise.prototype.done domain binding", () => {
  it("should execute onUnhandledError within the domain context", (done) => {
    const d = domain.create();
    const expectedError = new Error("test error");
    let activeDomainWhenHandlerCalled: any = "not-called";

    // Override nextTick to intercept when onUnhandledError is called
    const originalNextTick = Q.nextTick;
    Q.nextTick = function(task: Function) {
      // Wrap to capture domain at call time
      const domainAtCallTime = process.domain;
      return originalNextTick(function() {
        // We only care about the call that happens from onUnhandledError
        // which will be the one where domain is active (if bound)
        if (domainAtCallTime === d) {
          activeDomainWhenHandlerCalled = domainAtCallTime;
        }
        task();
      });
    };

    // Suppress actual error
    Q.onerror = function() {};

    d.run(() => {
      Q.reject(expectedError).done();
    });

    setTimeout(() => {
      Q.nextTick = originalNextTick;
      Q.onerror = null;
      expect(activeDomainWhenHandlerCalled).toBe(d);
      done();
    }, 150);
  });
});