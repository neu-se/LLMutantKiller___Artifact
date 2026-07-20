import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex number with both negative parts", () => {
    const c = new Complex("-2-3i");
    expect(c.re).toBe(-2);
    expect(c.im).toBe(-3);
  });
});