import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex number with decimal coefficients", () => {
    const c = new Complex("1.5+2.5i");
    expect(c.re).toBe(1.5);
    expect(c.im).toBe(2.5);
  });
});