import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex div mutation detection", () => {
  it("should correctly compute the real part of division when |c| >= |d|", () => {
    // Dividing (3 + 4i) / (2 + 1i)
    // In the else branch: c=2, d=1, x=d/c=0.5, t=d/x+c=4
    // Original: real = (a + b*x)/t = (3 + 4*0.5)/4 = 5/4 = 1.25
    // Mutated:  real = (a + b/x)/t = (3 + 4/0.5)/4 = 11/4 = 2.75
    const result = new Complex(3, 4).div(new Complex(2, 1));
    // The real part with original code is 1.25, with mutated code is 2.75
    expect(result.re).toBeCloseTo(1.25, 10);
  });
});