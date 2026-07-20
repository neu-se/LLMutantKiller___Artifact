import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth", () => {
  it("should correctly compute acoth for a complex number with real=2 and imaginary=1", () => {
    const c = new Complex(2, 1);
    const result = c.acoth();
    // The mutation changes -b/d to -b*d, which will produce a significantly different result
    // For c = 2 + 1i, the correct result should be approximately 0.333333 - 0.309262i
    expect(result.re).toBeCloseTo(0.333333, 4);
    expect(result.im).toBeCloseTo(-0.309262, 4);
  });
});