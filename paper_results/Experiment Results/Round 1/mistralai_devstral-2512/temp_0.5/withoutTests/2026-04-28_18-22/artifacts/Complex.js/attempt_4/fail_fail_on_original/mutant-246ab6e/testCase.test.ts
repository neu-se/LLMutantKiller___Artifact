import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh for a small value where Taylor approximation is used", () => {
    const z = new Complex(1e-10, 0);
    const result = z.cosh();
    const expected = 1 - 1e-10; // Taylor approximation for small x: cosh(x) ≈ 1 + x²/2
    expect(result.re).toBeCloseTo(expected, 10);
    expect(Math.abs(result.im)).toBeLessThan(1e-15);
  });
});