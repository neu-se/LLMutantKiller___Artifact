import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should handle subnormal numbers where d underflows to zero", () => {
    // Use values so small that a*a + b*b underflows to 0
    // but b !== 0, so the early return (b === 0) is not triggered
    const tiny = 5e-324; // Number.MIN_VALUE
    const z = new Complex(0, tiny);
    const result = z.acsch();
    // Original: im part of asinh input = -b/0 = -Infinity → result is finite
    // Mutated: im part of asinh input = 0 → different result
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});