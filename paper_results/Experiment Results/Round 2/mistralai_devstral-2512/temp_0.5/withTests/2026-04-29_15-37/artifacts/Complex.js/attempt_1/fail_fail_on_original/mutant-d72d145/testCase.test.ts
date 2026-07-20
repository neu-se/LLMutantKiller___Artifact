import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc() mutation test", () => {
  it("should correctly compute acsc for non-zero complex numbers", () => {
    const c = new Complex(2, 3);
    const result = c.acsc();
    // The mutation changes d = a*a + b*b to d = a/a + b*b, which would break the calculation
    // For a=2, b=3, original d=13, mutated d=1+9=10 (different calculation)
    // This will produce different results in the subsequent asin call
    expect(result.re).toBeCloseTo(0.1357, 3);
    expect(result.im).toBeCloseTo(-0.1425, 3);
  });
});