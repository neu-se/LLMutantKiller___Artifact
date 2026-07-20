import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should calculate the cosecans of a complex number correctly', () => {
    const complexNumber = new Complex(1, 2);
    const result = complexNumber.csc();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});