import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should handle atanh correctly", () => {
    const complex = new Complex(1.5, 0);
    const result = complex.atanh();
    const expected = new Complex(0.5493061443340548, 0);
    expect(Math.abs(result.re - expected.re)).toBeLessThan(1e-10);
    expect(Math.abs(result.im - expected.im)).toBeLessThan(1e-10);
  });
});