import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log method", () => {
  it("should return a real number log when imaginary part is 0 and real part is positive", () => {
    // For a positive real number a > 0, log(a) should be Math.log(a) + 0i
    // Original code: if (b === 0 && a > 0) => returns real log
    // Mutated code: if (b === 0 && a <= 0) => this branch is taken for non-positive reals instead
    const a = 5;
    const result = new Complex(a, 0).log();
    
    // The real part should be Math.log(5)
    expect(result.re).toBeCloseTo(Math.log(5), 10);
    // The imaginary part should be 0 (since arg(5) = atan2(0, 5) = 0)
    expect(result.im).toBeCloseTo(0, 10);
  });
});