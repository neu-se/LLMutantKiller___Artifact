import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should correctly compute atanh for a real number greater than 1", () => {
    const result = new Complex(2, 0).atanh();
    // The mutation changes the condition from 'if (noIM)' to 'if (true)'
    // This should affect the sign of the imaginary part for real inputs > 1
    // In the original code, the imaginary part should be negative
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});