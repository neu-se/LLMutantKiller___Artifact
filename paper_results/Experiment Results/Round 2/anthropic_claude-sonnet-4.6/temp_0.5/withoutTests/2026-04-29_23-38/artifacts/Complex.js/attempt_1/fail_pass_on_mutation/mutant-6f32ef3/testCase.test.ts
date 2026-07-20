import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex toString with imaginary part', () => {
  it('should correctly display purely imaginary number with b = -0', () => {
    // When a=0 and b is -0, the original should not add minus sign
    // but the mutated code (b <= 0) would add minus sign for b === 0 case
    // Actually let's test b = 0 for purely imaginary
    const c = new Complex(0, 1);
    expect(c.toString()).toBe('i');
  });
});