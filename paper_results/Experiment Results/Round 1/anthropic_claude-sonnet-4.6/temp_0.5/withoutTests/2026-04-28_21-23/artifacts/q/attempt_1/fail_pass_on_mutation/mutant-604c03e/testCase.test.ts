import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection behavior", () => {
  it("should not corrupt unhandledReasons when handling a rejection that was not tracked", async () => {
    // Create two rejections
    const err1 = new Error("error1");
    const err2 = new Error("error2");
    
    // Create a rejection and handle it (which calls untrackRejection)
    const p1 = Q.reject(err1);
    const p2 = Q.reject(err2);
    
    // Handle p1 to trigger untrackRejection for p1
    p1.then(null, () => {});
    
    await Q.delay(50);
    
    const reasons = Q.getUnhandledReasons();
    // p2 should still be unhandled, p1 should be removed
    expect(reasons.length).toBe(1);
  });
});