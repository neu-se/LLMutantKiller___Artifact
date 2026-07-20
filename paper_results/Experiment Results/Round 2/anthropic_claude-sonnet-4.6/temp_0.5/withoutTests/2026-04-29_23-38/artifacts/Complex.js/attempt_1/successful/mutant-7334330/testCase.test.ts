import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex div", () => {
  it("correctly computes the imaginary part when |Re(divisor)| >= |Im(divisor)|", () => {
    // Divide (1 + 2i) by (3 + 1i)
    // With c=3, d=1: |c| >= |d|, so the else branch is taken
    // x = d/c = 1/3, t = d*x + c = 1/3 + 3 = 10/3
    // Re = (a + b*x) / t = (1 + 2/3) / (10/3) = (5/3) / (10/3) = 0.5
    // Im (original) = (b - a*x) / t = (2 - 1/3) / (10/3) = (5/3) / (10/3) = 0.5
    // Im (mutated)  = (b - a/x) / t = (2 - 3) / (10/3) = -1 / (10/3) = -0.3
    const result = new Complex(1, 2).div(new Complex(3, 1));
    expect(result.re).toBeCloseTo(0.5, 10);
    expect(result.im).toBeCloseTo(0.5, 10);
  });
});