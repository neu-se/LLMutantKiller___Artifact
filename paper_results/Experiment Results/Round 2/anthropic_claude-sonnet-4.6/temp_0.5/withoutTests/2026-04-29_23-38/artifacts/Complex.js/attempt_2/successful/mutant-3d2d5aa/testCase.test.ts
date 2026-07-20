import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('detects mutation in acoth fallback branch real part for subnormal imaginary input', () => {
    const tiny = 5e-324; // smallest positive subnormal; tiny*tiny underflows to 0
    const c = new Complex(0, tiny);
    const result = c.acoth();
    // Original: new Complex(-Infinity, -Infinity).atanh() => NaN
    // Mutated:  new Complex(0, -Infinity).atanh() => finite value
    expect(result.isNaN()).toBe(true);
  });
});