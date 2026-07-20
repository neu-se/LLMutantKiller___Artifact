import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should correctly parse complex numbers from strings', () => {
    const complexNumber = new Complex('3+4i');
    expect(complexNumber.re).toBe(3);
    expect(complexNumber.im).toBe(4);
    const invalidComplexNumber = new Complex('3+Stryker was here!i');
    expect(invalidComplexNumber.re).toBeNaN();
    expect(invalidComplexNumber.im).toBeNaN();
  });
});