import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should handle atanh correctly for a specific input", () => {
    const complex = new Complex(-1, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(-Infinity, 10);
    expect(result.im).toBeCloseTo(0, 10);
    const complex2 = new Complex(0.5, 0);
    const result2 = complex2.atanh();
    expect(result2.re).toBeCloseTo(0.5493061443340548, 10);
    expect(result2.im).toBeCloseTo(0, 10);
  });
});