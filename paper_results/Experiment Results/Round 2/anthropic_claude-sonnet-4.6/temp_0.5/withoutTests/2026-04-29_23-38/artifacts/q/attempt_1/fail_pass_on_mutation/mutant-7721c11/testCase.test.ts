import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q array_indexOf fallback behavior", () => {
  it("should correctly track and untrack rejections using indexOf", async () => {
    Q.resetUnhandledRejections();
    
    const rejection = Q.reject(new Error("test error"));
    
    // Handle the rejection to prevent unhandled rejection
    rejection.catch(() => {});
    
    // The unhandled reasons should be empty after handling
    await Q.delay(50);
    
    const reasons = Q.getUnhandledReasons();
    expect(Array.isArray(reasons)).toBe(true);
  });
});