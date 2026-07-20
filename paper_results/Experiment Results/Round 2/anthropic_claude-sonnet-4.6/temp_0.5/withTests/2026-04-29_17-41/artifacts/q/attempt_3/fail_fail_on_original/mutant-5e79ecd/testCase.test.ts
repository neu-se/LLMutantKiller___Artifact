import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done", () => {
  it("should directly use the promise when no callbacks are provided rather than wrapping in then()", (done) => {
    const Q_any = Q as any;
    Q_any.resetUnhandledRejections();
    Q_any.onerror = function() {};

    const rejection = Q_any.reject("test-reason");
    rejection.done();

    Q_any.nextTick(function() {
      const reasons = Q_any.getUnhandledReasons();
      Q_any.onerror = null;
      expect(reasons.length).toBe(0);
      done();
    });
  });
});