import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log function", () => {
  it("should return a real number when computing log of a positive real number", () => {
    // log(a) where a > 0 and b === 0 should return Complex(Math.log(a), 0)
    // In original code: if (b === 0 && a > 0) => returns real log
    // In mutated code: if (b === 0 && a <= 0) => this branch is taken for negative/zero real numbers instead
    
    const a = 5;
    const result = new Complex(a, 0).log();
    
    // For a positive real number, log should give Math.log(a) as real part and 0 as imaginary part
    expect(result.re).toBeCloseTo(Math.log(a), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});