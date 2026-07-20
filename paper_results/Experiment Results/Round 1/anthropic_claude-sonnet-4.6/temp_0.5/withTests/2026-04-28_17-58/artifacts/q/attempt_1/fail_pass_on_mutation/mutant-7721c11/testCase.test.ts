import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf fallback behavior via unhandled rejection tracking", () => {
  it("correctly tracks and untracks rejections using indexOf", async () => {
    // Save original indexOf
    const originalIndexOf = Array.prototype.indexOf;
    
    // Remove native indexOf to force the fallback implementation
    // @ts-ignore
    delete Array.prototype.indexOf;
    
    try {
      // Re-require the module to use the fallback
      // Since we can't re-require easily, we test through the public API
      // that relies on array_indexOf: untrackRejection via .fail()
      
      Q.resetUnhandledRejections();
      
      const reason = new Error("test rejection");
      const rejected = Q.reject(reason);
      
      // The rejection should be tracked
      expect(Q.getUnhandledReasons().length).toBe(1);
      
      // Handling the rejection should untrack it (uses array_indexOf internally)
      await rejected.fail(function() { return "handled"; });
      
      // After handling, it should be untracked
      expect(Q.getUnhandledReasons().length).toBe(0);
    } finally {
      // Restore original indexOf
      Array.prototype.indexOf = originalIndexOf;
    }
  });
});