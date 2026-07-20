import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly divide complex numbers when real part of divisor dominates", () => {
    // (1 + i) / (2 + i)
    // Expected: (1+i)(2-i) / ((2+i)(2-i)) = (2 - i + 2i - i^2) / (4 + 1) = (3 + i) / 5 = 0.6 + 0.2i
    // This exercises the else branch in div where Math.abs(c) >= Math.abs(d)
    // Original: t = d * x + c, Mutated: t = d / x + c
    const result = new Complex(1, 1).div(new Complex(2, 1));
    expect(result.re).toBeCloseTo(0.6, 10);
    expect(result.im).toBeCloseTo(0.2, 10);
  });
});