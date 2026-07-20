import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate the complex arcus cosecans', () => {
    const complex = new Complex(1, 2);
    expect(complex.acsc().re).toBeDefined();
    expect(complex.acsc().im).toBeDefined();
  });
});