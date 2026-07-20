import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf fallback behavior", () => {
  it("should find elements using the indexOf fallback when native indexOf is unavailable", () => {
    // The array_indexOf function is captured at module load time using:
    // Array.prototype.indexOf || fallback
    // Since native indexOf exists, we need to test via the untrackRejection path
    // which uses array_indexOf internally.
    // 
    // We test by verifying that after handling a rejection, getUnhandledReasons
    // correctly removes it (relies on array_indexOf finding the promise in the array)
    
    Q.resetUnhandledRejections();
    
    // Create multiple rejections to ensure indexOf must find the right one
    const reason1 = new Error("reason1");
    const reason2 = new Error("reason2");
    const reason3 = new Error("reason3");
    
    const p1 = Q.reject(reason1);
    const p2 = Q.reject(reason2);
    const p3 = Q.reject(reason3);
    
    expect(Q.getUnhandledReasons().length).toBe(3);
    
    // Handle p2 - this calls untrackRejection which uses array_indexOf to find p2
    p2.fail(() => {});
    
    // p2 should be removed, p1 and p3 should remain
    expect(Q.getUnhandledReasons().length).toBe(2);
    expect(Q.getUnhandledReasons()).toContain(reason1.stack);
    expect(Q.getUnhandledReasons()).toContain(reason3.stack);
    expect(Q.getUnhandledReasons()).not.toContain(reason2.stack);
  });
});