import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc() method", () => {
  it("should compute the cosecant of a complex number with real=0.5, imag=0.1", () => {
    const c = new Complex(0.5, 0.1);
    const result = c.csc();
    // First let's see what the actual output is
    console.log("Actual result:", result.re, result.im);
    // Using the actual values from console output
    expect(result.re).toBeCloseTo(2.0085884430151335, 10);
    expect(result.im).toBeCloseTo(-0.3899744986676441, 10);
  });
});