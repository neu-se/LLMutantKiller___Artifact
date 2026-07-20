import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate acsc for non-zero input', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2, 4);
    expect(result.im).toBeCloseTo(0, 4);
  });
});