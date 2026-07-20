import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex number with empty string in imaginary part", () => {
    const c = new Complex("1+2");
    expect(c.re).toBe(1);
    expect(c.im).toBe(0);
  });
});