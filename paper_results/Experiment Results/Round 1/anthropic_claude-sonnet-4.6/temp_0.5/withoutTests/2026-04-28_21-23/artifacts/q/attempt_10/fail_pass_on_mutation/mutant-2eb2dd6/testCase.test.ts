import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection uses array_indexOf", () => {
  it("should handle a caught rejection without throwing", async () => {
    Q.resetUnhandledRejections();
    
    // Create a rejection then handle it - untrackRejection uses array_indexOf
    const p = Q.reject(new Error("handled"));
    
    // Catch it to trigger untrackRejection
    const result = await p.then(null, (e) => "caught: " + e.message);
    expect(result).toBe("caught: handled");
    
    // If array_indexOf is undefined, untrackRejection would throw
    const reasons = Q.getUnhandledReasons();
    expect(Array.isArray(reasons)).toBe(true);
  });
});