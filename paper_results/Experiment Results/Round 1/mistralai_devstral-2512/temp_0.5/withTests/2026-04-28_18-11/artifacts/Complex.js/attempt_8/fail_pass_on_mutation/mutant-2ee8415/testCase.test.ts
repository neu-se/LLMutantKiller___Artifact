import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should correctly compute acosh for a real number greater than 1", () => {
    const c = new Complex(1.5, 0);
    const result = c.acosh();
    expect(result.re).toBeCloseTo(0.9624236501192069);
    expect(result.im).toBeCloseTo(0);
  });
});