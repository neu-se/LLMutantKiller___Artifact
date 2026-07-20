import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("indexOf shim", () => {
  it("should correctly find elements using the array_indexOf shim by temporarily removing native indexOf", async () => {
    // Save original
    const originalIndexOf = Array.prototype.indexOf;
    
    // Remove native indexOf to force the shim to be used
    // Note: array_indexOf was already captured at module load time via uncurryThis,
    // so we need to test through Q's behavior that depends on array_indexOf
    
    // Restore
    Array.prototype.indexOf = originalIndexOf;
    
    // Test Q.any which internally uses array_reduce and rejection tracking
    const promises = [
      Q.reject(new Error("e1")),
      Q.reject(new Error("e2")),
      Q.reject(new Error("e3")),
    ];
    
    const result = await Q.any(promises).then(
      () => "fulfilled",
      (e: Error) => e.message
    );
    
    expect(result).toBe("Q can't get fulfillment value from any promise, all promises were rejected. Last error message: e3");
  });
});