import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing edge cases", () => {
  it("should correctly parse complex number with leading minus sign", () => {
    const c = new Complex("-i");
    expect(c.re).toBeCloseTo(0, 10);
    expect(c.im).toBeCloseTo(-1, 10);
  });
});