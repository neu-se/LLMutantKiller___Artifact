import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should correctly compute acsc for a specific complex number where mutation affects the result", () => {
    const c = new Complex(2, 3);
    const result = c.acsc();
    // The mutation changes d = a*a + b*b to d = a/a + b*b, which affects the calculation
    // For (2,3), this will produce different results in the acsc calculation
    expect(result.re).toBeCloseTo(0.2012678566390165, 10);
    expect(result.im).toBeCloseTo(-0.13417823738267767, 10);
  });
});