import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex hypot', () => {
  it('correctly handles large values where a strictly less than b', () => {
    // When a < b (not equal), both original and mutant take the if branch
    // When a > b, both take the else branch  
    // When a === b, original takes else, mutant takes if
    // Test a case where a < b to ensure if branch works correctly
    const c = new Complex(3000, 4000); // a=3000, b=4000, a < b
    // Expected: 4000 * sqrt(1 + (3000/4000)^2) = 4000 * sqrt(1 + 0.5625) = 4000 * sqrt(1.5625) = 4000 * 1.25 = 5000
    expect(c.abs()).toBe(5000);
  });
});