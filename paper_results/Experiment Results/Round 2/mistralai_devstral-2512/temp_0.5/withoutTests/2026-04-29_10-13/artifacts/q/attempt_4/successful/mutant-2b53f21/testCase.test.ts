const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q rejection tracking", () => {
  it("should untrack rejection when handler is attached", (done) => {
    const rejectionReason = new Error("test rejection");
    const rejectedPromise = Q.reject(rejectionReason);

    // Initially, the rejection should be tracked
    expect(Q.getUnhandledReasons().length).toBeGreaterThan(0);

    // Attach a rejection handler
    rejectedPromise.catch(() => {
      // After handler is called, check if rejection is untracked
      // Use setTimeout to allow the untracking to happen in next tick
      setTimeout(() => {
        expect(Q.getUnhandledReasons().length).toBe(0);
        done();
      }, 0);
    });
  });
});