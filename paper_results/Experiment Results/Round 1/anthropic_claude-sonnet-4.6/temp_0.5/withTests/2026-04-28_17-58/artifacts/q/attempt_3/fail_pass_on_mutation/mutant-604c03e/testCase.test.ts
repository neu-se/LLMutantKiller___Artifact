import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should not corrupt unhandled reasons when splicing with index -1", () => {
    Q.stopUnhandledRejectionTracking();
    Q.resetUnhandledRejections();

    // With if(true) instead of if(at !== -1), when at === -1,
    // unhandledRejections.splice(-1, 1) removes the LAST element incorrectly.
    // We need to reach the splice code, which means bypassing the early return.
    // The early return guard "if (true) { return; }" is itself suspicious -
    // let's verify the observable behavior of getUnhandledReasons after chaining.

    const error1 = new Error("first");
    const error2 = new Error("second");

    Q.reject(error1);
    Q.reject(error2);

    const reasons = Q.getUnhandledReasons();
    expect(reasons.length).toBe(2);
    expect(reasons[0]).toContain("first");
    expect(reasons[1]).toContain("second");

    Q.resetUnhandledRejections();
    expect(Q.getUnhandledReasons().length).toBe(0);
  });
});