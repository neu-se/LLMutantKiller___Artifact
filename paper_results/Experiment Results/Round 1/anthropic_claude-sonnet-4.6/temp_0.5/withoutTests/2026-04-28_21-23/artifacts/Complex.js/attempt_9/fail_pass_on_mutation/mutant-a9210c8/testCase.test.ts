import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech", () => {
  it("sech(1+2i) should have specific re and im values", () => {
    const a = 1, b = 2;
    const d = Math.cos(2 * b) + Math.cosh(2 * a);
    const expectedRe = 2 * Math.cosh(a) * Math.cos(b) / d;
    const expectedIm = -2 * Math.sinh(a) * Math.sin(b) / d;

    const result = new Complex(a, b).sech();

    // These will be NaN if b is undefined in the mutated code
    expect(Number.isFinite(result.re)).toBe(true);
    expect(Number.isFinite(result.im)).toBe(true);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});