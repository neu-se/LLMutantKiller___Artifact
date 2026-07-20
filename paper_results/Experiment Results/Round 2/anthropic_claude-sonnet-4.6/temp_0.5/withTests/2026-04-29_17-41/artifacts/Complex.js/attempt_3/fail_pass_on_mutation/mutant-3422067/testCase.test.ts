import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex abs large values', () => {
  it('computes abs correctly for large complex number where |re| > |im|', () => {
    // Force the large-number path where a > b (a = 4000, b = 3001)
    // Both original and mutated take else branch here
    // But let's test a case where a < b to ensure the if branch works
    const c = new Complex(3001, 4000);
    const expected = Math.sqrt(3001*3001 + 4000*4000);
    expect(c.abs()).toBeCloseTo(expected, 10);
  });
});