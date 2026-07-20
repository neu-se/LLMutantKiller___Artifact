import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate the natural log of a complex number', () => {
    const complexNumber = new Complex(-1, 0);
    const result = complexNumber.log();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Math.PI);
  });
});