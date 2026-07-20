import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly compute the imaginary part when dividing complex numbers where |re(divisor)| >= |im(divisor)|", () => {
    // (3 + 4i) / (2 + 1i)
    // Expected: 2 + 1i
    // In the else branch: x = d/c = 1/2 = 0.5, t = d*x + c = 0.5 + 2 = 2.5
    // Original im: (b - a*x)/t = (4 - 3*0.5)/2.5 = 2.5/2.5 = 1
    // Mutated im: (b - a/x)/t = (4 - 3/0.5)/2.5 = (4-6)/2.5 = -0.8
    const result = new Complex(3, 4).div(new Complex(2, 1));
    expect(result.re).toBeCloseTo(2, 10);
    expect(result.im).toBeCloseTo(1, 10);
  });
});