import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute atanh for a complex number with non-zero imaginary part", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    // The mutation changes the calculation of the real part in atanh
    // Original: (onePlus * oneMinus - b * b) / d
    // Mutated: (onePlus * oneMinus - b / b) / d
    // For b=0.5, b/b = 1, while b*b = 0.25, so the results will differ
    expect(result.re).toBeCloseTo(0.216, 3);
    expect(result.im).toBeCloseTo(0.549, 3);
  });
});