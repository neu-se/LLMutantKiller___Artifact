const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.done domain binding", () => {
  it("should call process.domain.bind when process.domain exists during done()", (done) => {
    const bindCalls: Function[] = [];
    const fakeDomain = {
      bind: (fn: Function) => {
        bindCalls.push(fn);
        return fn;
      }
    };

    const originalDomain = (process as any).domain;
    (process as any).domain = fakeDomain;

    const err = new Error("test");
    try {
      Q.reject(err).done();
    } finally {
      (process as any).domain = originalDomain;
    }

    setTimeout(() => {
      expect(bindCalls.length).toBeGreaterThan(0);
      done();
    }, 50);
  });
});