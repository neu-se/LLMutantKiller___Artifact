import { Complex } from '../../../complex.js';

describe('Complex.js', () => {
  it('should calculate the cosecans of a complex number correctly', () => {
    const complexNumber = new Complex(1, 2);
    const result = complexNumber.csc();
    expect(result.re).toBeCloseTo(-0.030337030337030336, 10);
    expect(result.im).toBeCloseTo(0.030337030337030336, 10);
  });
});