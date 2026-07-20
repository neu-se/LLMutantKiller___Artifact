import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow function", () => {
  it("should correctly compute pow for a non-zero base with positive real exponent", () => {
    // (2 + i)^2 should not be ZERO
    // With mutation: if (true) return Complex['ZERO'] - always returns zero
    // With original: only returns ZERO when a===0 && b===0 && z.re > 0 && z.im >= 0
    const c = new Complex(2, 1);
    const result = c.pow(new Complex(2, 0));
    
    // (2+i)^2 = 4 + 4i + i^2 = 4 + 4i - 1 = 3 + 4i
    expect(result.re).toBeCloseTo(3, 10);
    expect(result.im).toBeCloseTo(4, 10);
  });
});