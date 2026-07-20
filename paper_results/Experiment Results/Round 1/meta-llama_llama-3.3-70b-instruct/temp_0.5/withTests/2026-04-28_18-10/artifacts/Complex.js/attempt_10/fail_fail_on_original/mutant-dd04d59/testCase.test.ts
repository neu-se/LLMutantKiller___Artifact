import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should handle asinh correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    expect(result['re']).toBeCloseTo(-result['im']);
  });
});