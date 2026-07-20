import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex number from string with negative imaginary part", () => {
    const c = new Complex("3-4i");
    expect(c.re).toBe(3);
    expect(c.im).toBe(-4);
  });
});