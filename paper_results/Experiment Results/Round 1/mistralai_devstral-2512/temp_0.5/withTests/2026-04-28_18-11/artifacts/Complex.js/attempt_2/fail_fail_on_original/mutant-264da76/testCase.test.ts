import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should correctly compute acoth for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(2, 3);
    const result = c.acoth();
    expect(result.re).toBeCloseTo(0.1469466662255294, 10);
    expect(result.im).toBeCloseTo(-0.2205552515125138, 10);
  });
});