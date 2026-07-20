import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("node domain support in done()", () => {
  it("should call process.domain.bind when a domain is active during done()", (done) => {
    const d = domain.create();
    let bindWasCalled = false;
    const originalBind = d.bind.bind(d);
    
    // Patch bind on the domain object directly
    d.bind = function(fn: (...args: any[]) => any) {
      bindWasCalled = true;
      return originalBind(fn);
    };

    d.run(() => {
      // At this point process.domain === d
      // The original code does: process.domain.bind(onUnhandledError)
      // which is d.bind(onUnhandledError)
      Q.reject(new Error("test")).done();
    });

    // done() is synchronous in terms of setting up - bind should be called synchronously
    setImmediate(() => {
      expect(bindWasCalled).toBe(true);
      done();
    });
  });
});