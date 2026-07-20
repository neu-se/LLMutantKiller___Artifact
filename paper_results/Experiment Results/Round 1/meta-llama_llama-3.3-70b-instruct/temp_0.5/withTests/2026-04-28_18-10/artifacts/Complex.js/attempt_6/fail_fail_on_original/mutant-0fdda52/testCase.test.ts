import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should calculate the magnitude of a complex number', () => {
    const a = 3001;
    const b = 3000;
    const complexNumber = new Complex(a, b);
    const result = Math.sqrt(a * a + b * b);
    expect(complexNumber.abs()).toBeCloseTo(result);
  });
});