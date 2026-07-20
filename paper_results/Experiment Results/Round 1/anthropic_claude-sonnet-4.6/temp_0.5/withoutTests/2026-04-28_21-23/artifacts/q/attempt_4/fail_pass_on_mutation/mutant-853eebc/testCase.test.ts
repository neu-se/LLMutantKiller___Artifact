import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q rejection tracking with array_indexOf", () => {
  it("should remove rejection from unhandled list when handled", async () => {
    Q.resetUnhandledRejections();
    
    const reason = new Error("test error");
    const rejected = Q.reject(reason);
    
    await Q.delay(10);
    
    // Before handling
    const beforeHandling = Q.getUnhandledReasons();
    expect(beforeHandling.length).toBe(1);
    
    // Handle the rejection - this calls untrackRejection which uses array_indexOf
    rejected.then(null, function() {});
    
    await Q.delay(10);
    
    // After handling, should be removed
    const afterHandling = Q.getUnhandledReasons();
    expect(afterHandling.length).toBe(0);
  });
});