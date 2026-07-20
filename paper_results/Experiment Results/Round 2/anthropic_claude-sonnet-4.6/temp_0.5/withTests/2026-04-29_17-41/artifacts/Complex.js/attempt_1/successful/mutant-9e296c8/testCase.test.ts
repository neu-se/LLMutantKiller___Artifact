import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csch function", () => {
  it("should correctly compute csch for a complex number with non-trivial real part", () => {
    // csch(2 + i) = 2 / (e^(2+i) - e^-(2+i))
    // The mutation changes cosh(2 * a) to cosh(2 / a) in the denominator calculation
    // For a=2: original uses cosh(4), mutated uses cosh(1) - these differ significantly
    const c = new Complex(2, 1);
    const result = c.csch();

    // Expected values computed from the formula:
    // csch(a + bi) has re = -2*sinh(a)*cos(b)/d and im = 2*cosh(a)*sin(b)/d
    // where d = cos(2b) - cosh(2a)
    const a = 2;
    const b = 1;
    const cosh = (x: number) => (Math.exp(x) + Math.exp(-x)) / 2;
    const sinh = (x: number) => (Math.exp(x) - Math.exp(-x)) / 2;
    
    const d = Math.cos(2 * b) - cosh(2 * a);
    const expectedRe = -2 * sinh(a) * Math.cos(b) / d;
    const expectedIm = 2 * cosh(a) * Math.sin(b) / d;

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});