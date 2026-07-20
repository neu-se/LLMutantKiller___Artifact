import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex div mutation detection", () => {
  it("should correctly compute division of complex numbers when |re(divisor)| >= |im(divisor)|", () => {
    // (3 + 4i) / (2 + 1i) = (3+4i)(2-i)/5 = (6 - 3i + 8i - 4i^2)/5 = (10 + 5i)/5 = 2 + i
    // The mutation changes b*x to b/x in the real part calculation
    // Original: (a + b*x)/t = correct result
    // Mutated:  (a + b/x)/t = incorrect result
    const result = new Complex(3, 4).div(new Complex(2, 1));
    expect(result.re).toBeCloseTo(2, 10);
    expect(result.im).toBeCloseTo(1, 10);
  });
});