import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate acot for a complex number', () => {
    const z = new Complex(1, 1);
    const result = z.acot();
    expect(result.re).toBeCloseTo(-0.7853981633974483);
    expect(result.im).toBeCloseTo(-0.7853981633974483);
  });
});