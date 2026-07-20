import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex div method", () => {
  it("should correctly compute the imaginary part when dividing complex numbers where |c| >= |d|", () => {
    // Dividing (3 + 4i) by (2 + 1i)
    // In the else branch: |c|=2 >= |d|=1
    // x = d/c = 0.5, t = d*x + c = 2.5
    // Re = (a + b/x) / t = (3 + 8) / 2.5 = 4.4
    // Im original = (b - a*x) / t = (4 - 1.5) / 2.5 = 1.0
    // Im mutated  = (b - a/x) / t = (4 - 6) / 2.5 = -0.8
    const result = new Complex(3, 4).div(new Complex(2, 1));
    expect(result.re).toBeCloseTo(4.4, 10);
    expect(result.im).toBeCloseTo(1.0, 10);
  });
});