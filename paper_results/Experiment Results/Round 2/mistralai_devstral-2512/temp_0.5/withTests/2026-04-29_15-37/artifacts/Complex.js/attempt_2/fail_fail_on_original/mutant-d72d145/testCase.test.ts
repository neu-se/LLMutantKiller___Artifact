import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc() mutation test", () => {
  it("should correctly compute acsc for a specific complex number", () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    // The mutation changes d = a*a + b*b to d = a/a + b*b
    // For a=1, b=1: original d=2, mutated d=1+1=2 (same value)
    // Need a case where a/a != 1 (when a != 1)
    const c2 = new Complex(2, 1);
    const result2 = c2.acsc();
    expect(result2.re).toBeCloseTo(0.243, 3);
    expect(result2.im).toBeCloseTo(-0.402, 3);
  });
});