import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString sign detection", () => {
  it("should produce correct sign for imaginary part at epsilon boundary", () => {
    // b = -1e-15: Math.abs(-1e-15) = 1e-15, NOT < 1e-15 (equal, not less)
    // So b stays as -1e-15, b !== 0, a !== 0
    // Original: b < 0 → true → negate, add "-"  
    // Mutated: b <= 0 → true → negate, add "-"
    // Same! Still no difference.
    
    // What about b = 0 exactly? Early return catches it.
    // The mutation is truly a no-op.
    expect(new Complex(1, -1e-15).toString()).toBe("1 - 1e-15i");
  });
});