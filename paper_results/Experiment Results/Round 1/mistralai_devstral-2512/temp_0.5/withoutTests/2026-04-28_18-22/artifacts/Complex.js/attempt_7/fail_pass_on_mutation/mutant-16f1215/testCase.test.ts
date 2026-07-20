import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should correctly compute acsc for a specific complex number where the mutation affects the result", () => {
    const c = new Complex(1, 0);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(1.5707963267948966);
    expect(result.im).toBeCloseTo(0);
  });
});