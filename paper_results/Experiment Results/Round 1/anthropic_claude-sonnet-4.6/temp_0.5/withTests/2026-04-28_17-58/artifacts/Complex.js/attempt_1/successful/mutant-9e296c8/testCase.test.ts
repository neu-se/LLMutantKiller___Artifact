import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csch function", () => {
  it("should correctly compute csch(2 + i) using 2*a not 2/a in denominator", () => {
    // csch(c) = 2 / (e^c - e^-c)
    // For c = 2 + i:
    // a = 2, b = 1
    // d = Math.cos(2 * 1) - cosh(2 * 2) = Math.cos(2) - cosh(4)  [original]
    // d = Math.cos(2 * 1) - cosh(2 / 2) = Math.cos(2) - cosh(1)  [mutated]
    const c = new Complex(2, 1);
    const result = c.csch();

    // Compute expected values manually:
    // csch(a + bi) = -2*sinh(a)*cos(b)/d + i*2*cosh(a)*sin(b)/d
    // where d = cos(2b) - cosh(2a)
    const a = 2;
    const b = 1;
    const d = Math.cos(2 * b) - Math.cosh(2 * a);
    const expectedRe = -2 * Math.sinh(a) * Math.cos(b) / d;
    const expectedIm = 2 * Math.cosh(a) * Math.sin(b) / d;

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});