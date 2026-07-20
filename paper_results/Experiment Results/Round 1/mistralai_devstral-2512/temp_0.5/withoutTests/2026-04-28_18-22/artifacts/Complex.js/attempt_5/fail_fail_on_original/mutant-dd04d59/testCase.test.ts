import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should correctly compute asinh for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asinh();
    // The mutation changes res['re'] = -res['im'] to res['re'] = -res[""]
    // This will cause the real part to be NaN in the mutated version
    expect(Number.isFinite(result.re)).toBe(true);
    expect(Number.isFinite(result.im)).toBe(true);
    // Verify the relationship between real and imaginary parts
    expect(result.re).toBeCloseTo(-result.im, 10);
  });
});