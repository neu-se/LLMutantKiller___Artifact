import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("node domain support in done()", () => {
  it("should call process.domain.bind when process.domain exists during done()", (testDone) => {
    const originalDomain = process.domain;
    let bindCalled = false;
    let boundFn: any = null;
    const fakeFn = function() {};

    // Create a fake domain object on process.domain
    const fakeDomain = {
      bind: function<T extends Function>(fn: T): T {
        bindCalled = true;
        boundFn = fn;
        return fn; // just return the same function
      },
      enter: function() {},
      exit: function() {},
    };

    // Temporarily set process.domain to our fake
    Object.defineProperty(process, "domain", {
      value: fakeDomain,
      writable: true,
      configurable: true,
    });

    try {
      Q.onerror = function() {}; // suppress error
      Q.reject(new Error("test")).done();
      expect(bindCalled).toBe(true);
    } finally {
      Object.defineProperty(process, "domain", {
        value: originalDomain,
        writable: true,
        configurable: true,
      });
      Q.onerror = null;
    }
    testDone();
  });
});