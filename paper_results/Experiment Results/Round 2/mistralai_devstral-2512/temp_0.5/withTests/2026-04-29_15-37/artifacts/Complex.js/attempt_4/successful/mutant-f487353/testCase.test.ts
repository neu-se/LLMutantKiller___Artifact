import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc()", () => {
  it("should return the correct cosecant for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(1, 1);
    const result = c.csc();
    expect(result.re).toBeCloseTo(0.6215180171704285, 10);
    expect(result.im).toBeCloseTo(-0.30393100162842646, 10);
  });
});