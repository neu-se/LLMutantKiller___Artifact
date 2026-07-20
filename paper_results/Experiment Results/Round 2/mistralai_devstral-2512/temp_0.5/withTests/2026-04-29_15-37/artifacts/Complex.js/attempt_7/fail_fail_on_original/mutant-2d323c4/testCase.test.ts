import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should correctly compute acsch for complex number where a^2 - b^2 equals zero", () => {
    const c = new Complex(Math.sqrt(2), Math.sqrt(2));
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.881373587019543);
    expect(result.im).toBeCloseTo(-0.881373587019543);
  });
});