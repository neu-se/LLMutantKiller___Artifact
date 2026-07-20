import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('detects sign mutation via subnormal imaginary input causing d=0 branch', () => {
    const tiny = 5e-324; // smallest positive denormalized; tiny*tiny === 0
    // a=0, b=tiny: early return skipped (b !== 0), d = 0 + 0 = 0
    // original: new Complex(0, -tiny/0).asin() = new Complex(0, -Inf).asin() => (0, -Inf)
    // mutated:  new Complex(0, +tiny/0).asin() = new Complex(0, +Inf).asin() => NaN
    const result = new Complex(0, tiny).acsc();
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    expect(result.re).toBe(0);
    expect(result.im).toBe(-Infinity);
  });
});