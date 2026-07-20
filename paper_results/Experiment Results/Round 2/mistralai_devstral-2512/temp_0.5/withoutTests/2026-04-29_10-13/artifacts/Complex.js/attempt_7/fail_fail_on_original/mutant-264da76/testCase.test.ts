import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth", () => {
  it("should correctly compute acoth for a specific complex number", () => {
    const c = new Complex(2, 1);
    const result = c.acoth();
    // The mutation changes -b/d to -b*d, which will produce a significantly different result
    // For c = 2 + 1i, we can verify the exact expected values from the original implementation
    expect(result.re).toBeCloseTo(0.402359, 5);
    expect(result.im).toBeCloseTo(-0.309262, 5);
  });
});