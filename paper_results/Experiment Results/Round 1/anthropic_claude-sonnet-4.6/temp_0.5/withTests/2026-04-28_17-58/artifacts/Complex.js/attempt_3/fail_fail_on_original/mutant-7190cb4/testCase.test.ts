import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('detects sign mutation in acsc fallback path with tiny imaginary component', () => {
    const tiny = Number.MIN_VALUE;
    // a=0, b=tiny: d = tiny*tiny = 0 (underflow), triggers fallback
    // Original: new Complex(0, -Infinity).asin() -> im should be negative
    // Mutated: new Complex(0, +Infinity).asin() -> im should be positive
    const result = new Complex(0, tiny).acsc();
    expect(result.im).toBeLessThan(0);
  });
});