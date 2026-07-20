import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with multiple signs", () => {
    const c = new Complex("1+-2i");
    expect(c.re).toBeCloseTo(1, 10);
    expect(c.im).toBeCloseTo(-2, 10);
  });
});