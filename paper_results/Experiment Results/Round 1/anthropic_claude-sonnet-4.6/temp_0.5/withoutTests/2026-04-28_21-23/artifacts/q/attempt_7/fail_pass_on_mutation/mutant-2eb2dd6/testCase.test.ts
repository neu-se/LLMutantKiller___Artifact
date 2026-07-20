import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf usage in rejection tracking", () => {
  it("should track and allow retrieval of unhandled rejection reasons", async () => {
    Q.resetUnhandledRejections();
    const err = new Error("test rejection");
    Q.reject(err);
    
    // Give microtasks time to run
    await Q(null);
    await Q(null);
    
    const reasons = Q.getUnhandledReasons();
    expect(reasons.length).toBeGreaterThan(0);
  });
});