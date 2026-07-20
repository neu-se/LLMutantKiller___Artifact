import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('detects mutation in acoth fallback: result differs when d underflows to zero with non-zero a', () => {
    const tinyA = 5e-324; // smallest positive subnormal; tinyA * tinyA === 0, so d === 0
    const c = new Complex(tinyA, 0);
    const result = c.acoth();
    // Original: constructs Complex(Infinity, 0).atanh() => NaN
    // Mutant: constructs Complex(0, 0).atanh() => 0
    expect(result.re).toBeNaN();
  });
});