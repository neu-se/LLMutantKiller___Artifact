import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('acsc with value whose square is below Number.MIN_VALUE', () => {
    const a = 1e-162;
    const b = 0;
    // In strict IEEE 754: (1e-162)^2 = 1e-324 < Number.MIN_VALUE ≈ 4.94e-324 → underflows to 0
    // d = 0, a != 0, b = 0
    // Original: asin(Infinity, 0) → NaN
    // Mutated: asin(0, 0) → (0, 0)
    const result = new Complex(a, b).acsc();
    // Original gives NaN; mutated gives (0,0) which is not NaN
    expect(result.isNaN()).toBe(true);
  });
});