import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth", () => {
  it("should correctly compute acoth for a complex number with real=0.5 and imaginary=0.5", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.acoth();
    // The mutation changes -b/d to -b*d, which will produce a significantly different result
    // For c = 0.5 + 0.5i, we can verify the result is consistent with the original implementation
    // by checking the relationship between real and imaginary parts
    const expectedRatio = result.im / result.re;
    expect(expectedRatio).toBeCloseTo(-1.0, 2);
  });
});