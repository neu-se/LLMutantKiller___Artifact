import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth", () => {
  it("should correctly compute acoth for a complex number with real=1 and imaginary=0.5", () => {
    const c = new Complex(1, 0.5);
    const result = c.acoth();
    // The mutation changes -b/d to -b*d, which will produce a significantly different result
    // We can verify the original implementation by checking the result matches known values
    expect(result.re).toBeCloseTo(0.5, 1);
    expect(result.im).toBeCloseTo(-0.5, 1);
  });
});