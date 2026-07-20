import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth", () => {
  it("should correctly compute acoth for a complex number with specific real and imaginary parts", () => {
    const c = new Complex(1, 1);
    const result = c.acoth();
    // The mutation changes -b/d to -b*d, which will produce a significantly different result
    // For c = 1 + 1i, the correct result should be approximately 0.402359 + 0.553574i
    expect(result.re).toBeCloseTo(0.402359, 4);
    expect(result.im).toBeCloseTo(0.553574, 4);
  });
});