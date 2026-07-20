import { Complex } from "./complex.js";

describe("Complex acosh method", () => {
  it("should correctly compute acosh for a complex number with non-zero imaginary part", () => {
    const c = new Complex(2, 3);
    const result = c.acosh();
    // The mutation changes this['re'] to this[""] which would break the assignment
    // This test verifies that the real part is correctly assigned
    expect(result.re).toBeCloseTo(1.9833870299165354);
    expect(result.im).toBeCloseTo(0.9624236501192069);
  });
});