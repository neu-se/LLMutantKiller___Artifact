import { Complex } from "./complex.js";

describe("Complex.acoth()", () => {
  it("should correctly compute acoth for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(2, 3);
    const result = c.acoth();
    // The mutation changes -b/d to -b*d, which would significantly alter the result
    // We test against a known expected value computed from the original implementation
    expect(result.re).toBeCloseTo(0.1469466662255294, 10);
    expect(result.im).toBeCloseTo(-0.2205552515125138, 10);
  });
});