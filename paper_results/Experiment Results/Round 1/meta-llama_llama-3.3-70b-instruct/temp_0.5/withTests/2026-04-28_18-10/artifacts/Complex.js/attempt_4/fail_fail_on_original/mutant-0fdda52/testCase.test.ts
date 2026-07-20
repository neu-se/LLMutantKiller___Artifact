import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate the magnitude of a complex number', () => {
    const a = 3001;
    const b = 3;
    const complexNumber = new Complex(a, b);
    const result = Math.sqrt(a * a + b * b);
    expect(complexNumber.abs()).toBeCloseTo(result);
  });
});