import { Complex } from "./complex.js";

describe("Complex.acosh()", () => {
  it("should correctly compute acosh for a complex number with positive imaginary part", () => {
    const c = new Complex(2, 3);
    const result = c.acosh();
    // Expected behavior: acosh(2+3i) should return a complex number with specific real and imaginary parts
    // The mutation would cause res['im'] to be set incorrectly due to accessing res[""] instead of res['re']
    expect(result.re).toBeCloseTo(1.9833870299166354);
    expect(result.im).toBeCloseTo(-0.9624236501192069);
  });
});