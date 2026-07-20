import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('abs with large values where a strictly less than b', () => {
    // Force large-number path with a < b
    // a = 3000 (not < 3000, so first condition fails)
    // b = 4000 (> a)
    // Both branches: if taken, a=4000, b=3000/4000=0.75
    // result = 4000 * sqrt(1.5625) = 5000
    expect(new Complex(3000, 4000).abs()).toBe(5000);
  });
});