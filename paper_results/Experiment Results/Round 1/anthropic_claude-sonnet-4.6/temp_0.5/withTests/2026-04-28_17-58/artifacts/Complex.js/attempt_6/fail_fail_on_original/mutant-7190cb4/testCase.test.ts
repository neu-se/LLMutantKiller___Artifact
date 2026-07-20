import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('detects sign mutation via negative tiny imaginary input causing d underflow', () => {
    const tiny = Number.MIN_VALUE;
    // Original: new Complex(0, +Infinity).asin() -> NaN (Infinity - Infinity)
    // Mutated: new Complex(0, -Infinity).asin() -> (0, -Infinity) non-NaN
    const result = new Complex(0, -tiny).acsc();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBe(-Infinity);
  });
});