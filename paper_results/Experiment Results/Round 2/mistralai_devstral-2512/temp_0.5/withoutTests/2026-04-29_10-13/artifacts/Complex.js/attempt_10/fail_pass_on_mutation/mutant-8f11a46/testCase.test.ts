import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with scientific notation", () => {
    const c = new Complex("1e2+2e-1i");
    expect(c.re).toBeCloseTo(100, 10);
    expect(c.im).toBeCloseTo(0.2, 10);
  });
});