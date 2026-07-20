import { Complex } from '../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate sech correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.sech();
    expect(result.re).toBeCloseTo(0.2658376538936764, 10);
    expect(result.im).toBeCloseTo(-0.18315638893081457, 10);
  });
});