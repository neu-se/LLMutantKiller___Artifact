import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex div method", () => {
  it("should correctly compute the imaginary part when |c| >= |d| and x != 1/x", () => {
    // (1 + 2i) / (3 + 1i)
    // Correct: (1+2i)(3-i)/10 = (3+2+6i-i)/10 = (5+5i)/10 = 0.5 + 0.5i
    // In else branch: c=3, d=1, |c|>=|d|
    // x = d/c = 1/3, t = d*x+c = 1/9+3 = 28/9... wait let me recalc
    // t = d*x + c = 1*(1/3) + 3 = 10/3
    // Re = (a + b/x)/t = (1 + 2/(1/3))/(10/3) = (1+6)/(10/3) = 7*3/10 = 2.1... wrong
    // Im original = (b - a*x)/t = (2 - 1*(1/3))/(10/3) = (5/3)/(10/3) = 0.5 ✓
    // Im mutated  = (b - a/x)/t = (2 - 1/(1/3))/(10/3) = (2-3)/(10/3) = -1*3/10 = -0.3
    const result = new Complex(1, 2).div(new Complex(3, 1));
    expect(result.re).toBeCloseTo(0.5, 10);
    expect(result.im).toBeCloseTo(0.5, 10);
  });
});