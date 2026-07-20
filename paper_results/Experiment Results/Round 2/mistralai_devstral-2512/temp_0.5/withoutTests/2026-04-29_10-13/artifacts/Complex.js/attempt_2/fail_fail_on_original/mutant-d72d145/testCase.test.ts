import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("should correctly compute acsc for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.667456776396806, 10);
    expect(result.im).toBeCloseTo(-0.481211825059603, 10);
  });
});