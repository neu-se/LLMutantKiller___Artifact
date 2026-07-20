import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('detects sign mutation in acoth imaginary part when d underflows with zero real part', () => {
    const tiny = Number.MIN_VALUE;
    // a=0, b=tiny: d = 0+tiny*tiny = 0 (underflow), early return skipped (b != 0)
    // original: new Complex(0, -Infinity).atanh()
    // mutated:  new Complex(0, +Infinity).atanh()
    const orig = new Complex(0, -Infinity).atanh();
    const mut = new Complex(0, Infinity).atanh();
    // Verify they differ
    const c = new Complex(0, tiny);
    const result = c.acoth();
    expect(result.re).toBeCloseTo(orig.re, 10);
    expect(result.im).toBeCloseTo(orig.im, 10);
  });
});