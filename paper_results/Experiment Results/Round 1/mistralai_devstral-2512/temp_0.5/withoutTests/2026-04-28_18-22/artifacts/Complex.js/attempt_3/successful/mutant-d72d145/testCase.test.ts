import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc method", () => {
  it("should correctly compute acsc for a complex number", () => {
    const c = new Complex(2, 3);
    const result = c.acsc();
    // The mutation changes the calculation of 'd' in acsc method
    // Original: d = a * a + b * b
    // Mutated: d = a / a + b * b (which is 1 + b * b for a=2)
    // This will produce different results, especially for the real part
    expect(result.re).toBeCloseTo(0.1504, 3);
    expect(result.im).toBeCloseTo(-0.2313, 3);
  });
});