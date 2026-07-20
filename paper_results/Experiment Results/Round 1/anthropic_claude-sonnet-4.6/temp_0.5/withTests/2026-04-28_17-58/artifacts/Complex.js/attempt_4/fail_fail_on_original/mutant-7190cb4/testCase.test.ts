import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('detects sign mutation in acsc fallback path - original produces non-NaN, mutated produces NaN', () => {
    const tiny = Number.MIN_VALUE;
    // a=0, b=tiny: d=0 triggers fallback
    // Original: new Complex(0, -Infinity).asin() -> finite result
    // Mutated: new Complex(0, +Infinity).asin() -> NaN (Infinity - Infinity)
    const result = new Complex(0, tiny).acsc();
    expect(result.isNaN()).toBe(false);
  });
});