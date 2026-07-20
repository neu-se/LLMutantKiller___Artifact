import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("correctly divides complex numbers when real part of divisor dominates", () => {
    // Divides (3 + 4i) by (2 + i)
    // Expected result: 2 + i
    // This exercises the else branch in div where Math.abs(c) >= Math.abs(d)
    // Original: t = d * x + c; Mutated: t = d / x + c;
    const numerator = new Complex(3, 4);
    const divisor = new Complex(2, 1);
    const result = numerator.div(divisor);

    expect(result.re).toBeCloseTo(2, 10);
    expect(result.im).toBeCloseTo(1, 10);
  });
});