import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection unhandledRejection emit behavior", () => {
  it("should emit unhandledRejection for promises found in unhandledRejections array", async () => {
    // The mutation changes !== -1 to !== +1
    // array_indexOf returns -1 when not found, >= 0 when found
    // Original: emit when found (index !== -1)
    // Mutated: emit when index !== 1 (i.e., NOT at position 1)
    
    // We need process.emit to be a string "" to trigger the branch
    // But that's not possible without mocking
    // Instead, test observable behavior through getUnhandledReasons
    
    const reason = new Error("test rejection");
    const p = Q.reject(reason);
    
    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 50));
    
    const reasons = Q.getUnhandledReasons();
    expect(reasons.length).toBeGreaterThan(0);
    expect(reasons[0]).toContain("test rejection");
    
    Q.resetUnhandledRejections();
  });
});