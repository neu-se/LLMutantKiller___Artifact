import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("does not remove an unrelated rejection when a non-tracked promise is handled", () => {
    Q.resetUnhandledRejections();

    // Add a tracked rejection
    const error1 = new Error("first error");
    Q.reject(error1);

    expect(Q.getUnhandledReasons().length).toEqual(1);
    const savedReason = Q.getUnhandledReasons()[0];

    // Now create and immediately handle a NEW rejection
    // This promise's rejection gets tracked then untracked
    const p = Q.reject(new Error("second error"));
    
    return p.fail(function() {
      // handle it
    }).then(function() {
      // The first unhandled rejection should still be there
      // With mutation: splice(-1,1) or splice(at,1) with wrong at
      // might remove the first error incorrectly
      const reasons = Q.getUnhandledReasons();
      expect(reasons.length).toEqual(1);
      expect(reasons[0]).toEqual(savedReason);
    });
  });
});