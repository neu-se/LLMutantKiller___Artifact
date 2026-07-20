import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should correctly compute acoth for a specific complex number", () => {
    const c = new Complex(1, 1);
    const result = c.acoth();
    // These values are computed from the original implementation
    expect(result.re).toBeCloseTo(0.4023594781362155, 10);
    expect(result.im).toBeCloseTo(-0.5535743588273478, 10);
  });
});