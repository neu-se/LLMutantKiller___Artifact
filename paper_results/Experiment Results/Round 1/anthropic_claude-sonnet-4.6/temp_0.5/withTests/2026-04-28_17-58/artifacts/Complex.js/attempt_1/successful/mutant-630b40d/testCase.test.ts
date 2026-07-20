import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex abs large values', () => {
  it('computes abs correctly for large complex numbers triggering the overflow-safe hypot path', () => {
    // For 3000 + 4000i, the absolute value should be 5000
    // The hypot function uses a special path when values >= 3000
    // Original: return a * Math.sqrt(1 + b*b) => 4000 * 1.25 = 5000
    // Mutated:  return a / Math.sqrt(1 + b*b) => 4000 / 1.25 = 3200
    const c = new Complex(3000, 4000);
    expect(c.abs()).toBeCloseTo(5000, 5);
  });
});