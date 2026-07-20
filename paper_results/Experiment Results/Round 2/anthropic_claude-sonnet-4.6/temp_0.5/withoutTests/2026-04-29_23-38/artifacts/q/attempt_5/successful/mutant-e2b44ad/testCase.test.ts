import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("Q.done", () => {
  it("uses process.domain.bind to wrap onUnhandledError when domain is active", (done) => {
    const d = domain.create();
    let domainErrorCount = 0;

    d.on("error", () => {
      domainErrorCount++;
    });

    // Monkey-patch process.domain.bind to detect if it's called
    const originalBind = d.bind.bind(d);
    let bindWasCalled = false;
    d.bind = function(fn: Function) {
      bindWasCalled = true;
      return originalBind(fn);
    };

    d.run(() => {
      const deferred = Q.defer();
      deferred.promise.done();
      deferred.reject(new Error("test"));
      
      setTimeout(() => {
        expect(bindWasCalled).toBe(true);
        done();
      }, 100);
    });
  });
});