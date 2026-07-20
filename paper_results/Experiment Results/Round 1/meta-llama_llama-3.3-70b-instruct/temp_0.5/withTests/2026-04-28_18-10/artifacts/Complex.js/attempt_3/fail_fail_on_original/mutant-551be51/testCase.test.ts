import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate the ceiling of a complex number', () => {
    const complex = new Complex(1.5, 2.7);
    const result = complex.ceil();
    expect(result.re).toBe(2);
    expect(result.im).toBe(3);
  });
});