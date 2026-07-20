import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection", () => {
  it("should remove reason from unhandledReasons when rejection is handled", () => {
    Q.resetUnhandledRejections();

    const reason = new Error("test unhandled");
    
    // Create a rejected promise - this adds to unhandledReasons
    const rejected = Q.reject(reason);
    
    // Verify it was tracked
    expect(Q.getUnhandledReasons()).toEqual([reason.stack]);
    
    // Now handle the rejection by chaining a fail handler
    // This calls untrackRejection which should remove from unhandledReasons
    rejected.fail(function () {});
    
    // After handling, unhandledReasons should be empty
    expect(Q.getUnhandledReasons()).toEqual([]);
  });
});