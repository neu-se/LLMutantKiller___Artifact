import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate the ceiling of a complex number', () => {
    const complex = new Complex(1.5, 2.7);
    const result = complex.ceil();
    expect(result.re).toBeGreaterThan(1);
    expect(result.im).toBeGreaterThan(2);
  });
});