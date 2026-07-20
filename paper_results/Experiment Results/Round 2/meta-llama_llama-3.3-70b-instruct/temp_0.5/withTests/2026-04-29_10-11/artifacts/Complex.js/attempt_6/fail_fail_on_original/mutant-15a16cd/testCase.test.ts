import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate the ceiling correctly when places is a number', () => {
    const complex = new Complex(1.234, 5.678);
    const result = complex.ceil(2);
    expect(result.re).toBeCloseTo(1.24, 2);
    expect(result.im).toBeCloseTo(5.68, 2);
  });

  it('should calculate the ceiling correctly when places is a boolean', () => {
    const complex = new Complex(1.234, 5.678);
    const result = complex.ceil(true);
    expect(result.re).toBeCloseTo(2, 0);
    expect(result.im).toBeCloseTo(6, 0);
  });
});