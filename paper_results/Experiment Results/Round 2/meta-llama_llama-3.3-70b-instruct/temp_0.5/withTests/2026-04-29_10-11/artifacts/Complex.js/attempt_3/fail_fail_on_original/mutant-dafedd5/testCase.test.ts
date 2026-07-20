import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate the ceiling of a complex number', () => {
    const complex = new Complex(1.234, 5.678);
    const result = complex.ceil(2);
    expect(result.re).toBeCloseTo(1.24, 2); 
    expect(result.im).toBeCloseTo(5.68, 2);
  });
});