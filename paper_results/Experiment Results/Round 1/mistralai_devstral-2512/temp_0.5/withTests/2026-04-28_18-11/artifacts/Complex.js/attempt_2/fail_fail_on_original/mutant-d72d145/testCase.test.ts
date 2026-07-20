import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should correctly compute acsc for a non-zero complex number", () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.402359478108525, 10);
    expect(result.im).toBeCloseTo(-0.402359478108525, 10);
  });
});