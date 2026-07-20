import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosh function", () => {
  it("should correctly compute the real part of cosh for a complex number with imaginary component", () => {
    // cosh(0 + i*b) = cos(b) (real part), since cosh(0)=1 and sinh(0)=0
    // cosh(a + i*b) = cosh(a)*cos(b) + i*sinh(a)*sin(b)
    // For a=1, b=1: re = cosh(1)*cos(1), im = sinh(1)*sin(1)
    // The mutated cosh returns undefined, so cosh(a) = undefined
    // undefined * cos(b) = NaN, so result.re would be NaN
    const c = new Complex(1, 1);
    const result = c.cosh();

    const expectedRe = Math.cosh(1) * Math.cos(1);
    const expectedIm = Math.sinh(1) * Math.sin(1);

    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});