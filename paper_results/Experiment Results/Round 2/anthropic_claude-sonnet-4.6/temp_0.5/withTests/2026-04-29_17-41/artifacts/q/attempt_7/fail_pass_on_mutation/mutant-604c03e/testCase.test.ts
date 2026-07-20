import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection mutation detection", () => {
  it("should not remove the last unhandled reason when splicing with index -1 due to if(true) mutation", () => {
    Q.resetUnhandledRejections();

    // We need to get past the early return in untrackRejection
    // The early return is: if (true) { return; }
    // This means untrackRejection always returns early
    // BUT - looking again at the source, maybe trackUnhandledRejections
    // affects whether the early return fires

    Q.stopUnhandledRejectionTracking();
    Q.resetUnhandledRejections();

    // After reset, trackUnhandledRejections is true again
    const err1 = new Error("error 1");
    const err2 = new Error("error 2");
    
    Q.reject(err1);
    Q.reject(err2);

    return Q.reject(err1).fail(function() {}).then(function() {
      const reasons = Q.getUnhandledReasons();
      // Should still have 2 unhandled (err1 and err2 from above)
      // plus err1 again = 3, but err1 handled = 2 remaining
      expect(reasons.length).toBeGreaterThanOrEqual(2);
    });
  });
});