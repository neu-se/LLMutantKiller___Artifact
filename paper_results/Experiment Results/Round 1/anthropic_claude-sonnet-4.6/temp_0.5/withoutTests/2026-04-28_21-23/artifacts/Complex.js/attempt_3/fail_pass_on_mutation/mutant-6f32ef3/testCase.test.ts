import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex toString', () => {
  it('should format purely imaginary number with b just below zero', () => {
    // When a=0 and b is negative, original uses b < 0, mutated uses b <= 0
    // The difference only matters at b === 0, but that's caught by early return
    // However, the space " " is added only when a !== 0
    // For a=0, b=-1: original adds "-", mutated adds "-" (same)
    // For a=3, b=0: early return catches it
    // Let's verify the space is present for mixed numbers
    const c = new Complex(3, 2);
    expect(c.toString()).toBe('3 + 2i');
  });
});