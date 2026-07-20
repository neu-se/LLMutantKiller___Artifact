import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex div", () => {
  it("should correctly compute the imaginary part when dividing complex numbers where |c| >= |d|", () => {
    // (3 + 4i) / (2 + 1i) = 2 + i
    // This exercises the else branch in div where x = d/c and t = d*x + c
    // Original: im = (b - a*x) / t
    // Mutated:  im = (b - a/x) / t  (wrong)
    const result = new Complex(3, 4).div(new Complex(2, 1));
    expect(result.re).toBeCloseTo(2, 10);
    expect(result.im).toBeCloseTo(1, 10);
  });
});