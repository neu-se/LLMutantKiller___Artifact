import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch function", () => {
  it("should correctly compute acsch for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(3, 4);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.125, 3);
    expect(result.im).toBeCloseTo(-0.25, 3);
  });
});