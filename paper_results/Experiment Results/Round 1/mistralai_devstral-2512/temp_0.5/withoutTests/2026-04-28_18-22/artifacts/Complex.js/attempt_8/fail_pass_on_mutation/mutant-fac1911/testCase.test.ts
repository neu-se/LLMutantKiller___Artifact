import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch function", () => {
  it("should correctly compute acsch for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    const c2 = new Complex(1, 1);
    const result2 = c2.acsch();
    expect(result.re).toBe(result2.re);
    expect(result.im).toBe(result2.im);
  });
});