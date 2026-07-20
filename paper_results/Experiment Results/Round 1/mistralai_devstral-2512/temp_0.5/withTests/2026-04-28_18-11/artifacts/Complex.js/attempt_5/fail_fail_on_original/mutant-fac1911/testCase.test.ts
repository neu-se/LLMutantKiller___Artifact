import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should correctly compute acsc for a complex number with specific values", () => {
    const c = new Complex(1, 0);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.5, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});