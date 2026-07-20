import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should correctly compute acoth for a complex number with real=1, imag=1", () => {
    const c = new Complex(1, 1);
    const result = c.acoth();
    // Using lower precision to account for floating point variations
    expect(result.re).toBeCloseTo(0.4023594781362155, 8);
    expect(result.im).toBeCloseTo(-0.5535743588273478, 8);
  });
});