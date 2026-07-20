import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should calculate acosh correctly and handle the placeholder correctly", () => {
    const complex = new Complex(2, 0);
    const result = complex.acosh();
    expect(result.re).toBeCloseTo(1.3169578969248166);
    expect(result.im).toBeCloseTo(0);
    const complex2 = new Complex(result.re, result.im);
    expect(complex2.acosh().re).toBeCloseTo(2);
    expect(complex2.acosh().im).toBeCloseTo(0);
  });
});