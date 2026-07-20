import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const a = 3000;
    const b = 3000;
    const result1 = Complex.hypot(a, b);
    const result2 = Math.sqrt(a * a + b * b);
    expect(result1).toBeCloseTo(result2, 10);
  });
});