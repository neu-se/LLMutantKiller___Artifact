import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex div", () => {
  it("should correctly divide complex numbers when real part of divisor dominates imaginary part", () => {
    // (3 + 4i) / (2 + i)
    // Expected: (3+4i)(2-i)/5 = (6-3i+8i+4)/5 = (10+5i)/5 = 2 + i
    // This exercises the else branch in div where |c| >= |d|
    const result = new Complex(3, 4).div(new Complex(2, 1));
    expect(result.re).toBeCloseTo(2, 10);
    expect(result.im).toBeCloseTo(1, 10);
  });
});