import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with negative real parts", () => {
    const c = new Complex("-5+3i");
    expect(c.re).toBeCloseTo(-5, 10);
    expect(c.im).toBeCloseTo(3, 10);
  });
});