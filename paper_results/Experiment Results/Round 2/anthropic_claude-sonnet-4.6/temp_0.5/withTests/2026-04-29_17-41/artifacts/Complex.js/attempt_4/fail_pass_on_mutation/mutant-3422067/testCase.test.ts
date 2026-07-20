import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('hypot mutation', () => {
  it('abs with large equal magnitude components where x and y differ in sign', () => {
    // For x=3001, y=3001: a=b=3001, large-number path
    // Original else: b = 3001/3001 = 1, result = 3001*sqrt(2)
    // Mutated if: a=3001, b = 3001/3001 = 1, result = 3001*sqrt(2)
    // Need x/y != y/x...
    const c = new Complex(3001, 3001);
    expect(c.abs()).toBe(3001 * Math.SQRT2);
  });
});