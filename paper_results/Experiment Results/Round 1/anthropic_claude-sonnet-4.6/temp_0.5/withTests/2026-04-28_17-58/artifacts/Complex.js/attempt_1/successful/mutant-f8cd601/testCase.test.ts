import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csch function", () => {
  it("should correctly compute the complex hyperbolic cosecant csch(1 + i)", () => {
    const c = new Complex(1, 1);
    const result = c.csch();
    
    // csch(a + bi) = -2*sinh(a)*cos(b)/d + i*2*cosh(a)*sin(b)/d
    // where d = cos(2b) - cosh(2a)
    const a = 1;
    const b = 1;
    const d = Math.cos(2 * b) - Math.cosh(2 * a);
    const expectedRe = -2 * Math.sinh(a) * Math.cos(b) / d;
    const expectedIm = 2 * Math.cosh(a) * Math.sin(b) / d;
    
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});