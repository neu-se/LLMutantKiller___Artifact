import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with multiple operators", () => {
  it("should correctly parse complex number with alternating operators", () => {
    const c = new Complex("-+2-3i");
    expect(c.re).toBeCloseTo(-2, 10);
    expect(c.im).toBeCloseTo(-3, 10);
  });
});