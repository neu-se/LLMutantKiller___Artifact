import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute atanh for a complex number with real=0.5 and imaginary=0.5", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    // The mutation changes the division by 2 to multiplication by 2 in the imaginary part calculation
    // The correct imaginary part should be approximately 0.5535743588970452
    // The mutated version would produce approximately 2.214297435588181 (4x the correct value)
    expect(result.im).toBeCloseTo(0.5535743588970452, 10);
  });
});