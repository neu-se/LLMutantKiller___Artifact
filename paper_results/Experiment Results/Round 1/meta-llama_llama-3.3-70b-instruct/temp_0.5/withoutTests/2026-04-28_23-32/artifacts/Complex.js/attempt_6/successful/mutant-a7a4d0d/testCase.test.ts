import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should calculate acosh correctly for a specific case", () => {
    const complex = new Complex(2, 0);
    const result = complex.acosh();
    expect(result.re).toBeCloseTo(1.3169578969248166);
    expect(result.im).toBeCloseTo(0);
    const complex2 = new Complex(-2, 0);
    const result2 = complex2.acosh();
    expect(result2.re).toBeCloseTo(1.3169578969248166);
    expect(result2.im).toBeCloseTo(Math.PI);
  });
});