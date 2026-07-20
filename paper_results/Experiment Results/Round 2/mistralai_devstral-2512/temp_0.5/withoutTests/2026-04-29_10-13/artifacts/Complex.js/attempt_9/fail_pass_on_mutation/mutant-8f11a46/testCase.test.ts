import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with negative decimal coefficients", () => {
    const c = new Complex("-1.5-2.5i");
    expect(c.re).toBeCloseTo(-1.5, 10);
    expect(c.im).toBeCloseTo(-2.5, 10);
  });
});