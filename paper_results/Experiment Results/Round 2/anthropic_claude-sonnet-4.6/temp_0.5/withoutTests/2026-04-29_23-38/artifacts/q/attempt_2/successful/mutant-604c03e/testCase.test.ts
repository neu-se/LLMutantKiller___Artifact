import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection double-handle", () => {
  it("should not corrupt unhandledReasons when a rejection is handled twice", async () => {
    Q.resetUnhandledRejections();

    const err1 = new Error("error1");
    const err2 = new Error("error2");

    // Create two unhandled rejections
    const p1 = Q.reject(err1);
    Q.reject(err2); // keep err2 unhandled

    await new Promise<void>((resolve) => setTimeout(resolve, 50));
    expect(Q.getUnhandledReasons().length).toBe(2);

    // Handle p1 once - removes it from list (at=0 or 1)
    p1.then(null, () => {});
    await new Promise<void>((resolve) => setTimeout(resolve, 50));

    // Handle p1 again - now at=-1, original skips, mutation splices last element
    p1.then(null, () => {});
    await new Promise<void>((resolve) => setTimeout(resolve, 50));

    // err2 should still be unhandled
    const reasons = Q.getUnhandledReasons();
    expect(reasons.length).toBe(1);
  });
});