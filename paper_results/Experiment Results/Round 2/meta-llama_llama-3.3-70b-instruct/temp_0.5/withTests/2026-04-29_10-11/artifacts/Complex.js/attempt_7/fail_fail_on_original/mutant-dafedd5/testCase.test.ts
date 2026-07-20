import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate the ceiling of a complex number', () => {
    const complex = new Complex(10.234, 5.678);
    const result = complex.ceil(0.1);
    expect(result.re).toBeCloseTo(100.3, 1); 
    expect(result.im).toBeCloseTo(56.8, 1);
  });
});