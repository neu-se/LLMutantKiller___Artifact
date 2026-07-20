import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function mutation test", () => {
  it("should correctly compute expm1 for small complex numbers", () => {
    // Test with a small complex number where cosm1 is used
    const c = new Complex(0.001, 0.001);
    const result = c.expm1();
    // The expected result using direct computation
    const expectedReal = Math.expm1(0.001) * Math.cos(0.001) + (Math.cos(0.001) - 1);
    const expectedImag = Math.exp(0.001) * Math.sin(0.001);
    // Check both real and imaginary parts
    expect(result.re).toBeCloseTo(expectedReal, 10);
    expect(result.im).toBeCloseTo(expectedImag, 10);
  });
});