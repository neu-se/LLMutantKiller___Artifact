import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("should format complex number with zero real after epsilon and negative imaginary", () => {
    // a = 1e-16 (< EPSILON, becomes 0 in toString), b = -1
    // In toString: a becomes 0, b stays -1
    // b !== 0, a !== 0? NO (a=0 after epsilon)
    // else if (b < 0): -1 < 0 → true on BOTH original and mutated
    // Result: "-i"
    const c = new Complex(1e-16, -1);
    expect(c.toString()).toBe("-i");
  });
});