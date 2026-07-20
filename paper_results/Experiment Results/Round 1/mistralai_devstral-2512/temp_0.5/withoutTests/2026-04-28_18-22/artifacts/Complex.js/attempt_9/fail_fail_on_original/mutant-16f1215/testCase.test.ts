import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should correctly compute acsc for a complex number with both non-zero parts", () => {
    const c = new Complex(2, 3);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.1528560718942273);
    expect(result.im).toBeCloseTo(-0.1019174345850493);
  });
});