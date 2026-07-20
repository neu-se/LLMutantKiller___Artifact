import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech function", () => {
  it("should return correct result for asech(2) which requires imaginary part in intermediate computation", () => {
    // For a real input > 1, asech uses b (imaginary part = 0)
    // but for input between 0 and 1, the result has non-trivial imaginary part
    // Let's verify the real part is computed correctly using b
    const c = new Complex(2, 3);
    const result = c.asech();
    const resultFromScratch = new Complex(2 / (4 + 9), -3 / (4 + 9)).acosh();
    
    expect(result.re).toBeCloseTo(resultFromScratch.re, 10);
    expect(result.im).toBeCloseTo(resultFromScratch.im, 10);
  });
});