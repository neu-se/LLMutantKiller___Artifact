import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with operator before imaginary unit", () => {
  it("should correctly parse complex number with operator before imaginary unit", () => {
    const c = new Complex("2+-3i");
    expect(c.re).toBeCloseTo(2, 10);
    expect(c.im).toBeCloseTo(-3, 10);
  });
});