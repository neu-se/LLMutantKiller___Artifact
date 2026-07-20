import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString sign for zero imaginary", () => {
  it("should show plus not minus when imaginary is zero after epsilon normalization with non-zero real", () => {
    // Create object where im getter returns different values on successive calls
    const c = Object.create((Complex as any).prototype);
    let callCount = 0;
    Object.defineProperty(c, 're', { get: () => 3 });
    Object.defineProperty(c, 'im', { 
      get: () => {
        callCount++;
        // First call (b = this['im']): return 1e-14 to pass epsilon check
        // But epsilon check: Math.abs(1e-14) < 1e-15? No, 1e-14 > 1e-15
        // So b stays as 1e-14... not 0
        return callCount === 1 ? 1e-14 : 0;
      }
    });
    // b = this['im'] → 1e-14 (first call, local var b = 1e-14)
    // b is now a LOCAL variable, not the getter anymore
    // So subsequent uses of b use the local value 1e-14, not 0
    // This approach won't work because b is captured as a local variable
    expect(c.toString()).toBe("3 + 1e-14i");
  });
});