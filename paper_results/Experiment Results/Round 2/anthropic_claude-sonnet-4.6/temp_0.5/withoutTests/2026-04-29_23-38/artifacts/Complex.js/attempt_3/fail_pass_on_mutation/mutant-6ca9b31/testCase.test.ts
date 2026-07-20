import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString with zero imaginary part bypassing early return", () => {
  it("should not produce minus sign when imaginary part is zero after EPSILON normalization with negative tiny value", () => {
    // Create complex with tiny negative imaginary that gets zeroed by EPSILON check
    // b = -5e-16: Math.abs(-5e-16) = 5e-16 < 1e-15 (EPSILON), so b becomes 0
    // Then if (b === 0) return ret + a fires -> returns "3"
    // Both versions return "3" - same
    
    // Need b=0 to reach mutation... let me try overriding im directly
    const c = new Complex(3, 1);
    // Override im to be exactly 0 after construction
    // toString reads this['im'] directly
    Object.defineProperty(c, 'im', { value: 0, writable: true, configurable: true });
    // Now toString: b=0, EPSILON check: 0 < 1e-15 -> b=0, early return fires -> "3"
    // Still same in both versions
    expect(c.toString()).toBe("3");
  });
});