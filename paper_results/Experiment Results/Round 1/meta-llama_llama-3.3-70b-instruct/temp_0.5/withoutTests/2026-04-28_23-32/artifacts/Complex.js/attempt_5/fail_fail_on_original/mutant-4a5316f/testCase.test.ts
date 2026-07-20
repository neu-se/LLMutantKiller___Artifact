import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate the complex acoth correctly for a specific case', () => {
    const complex = new Complex(1, -1);
    const result = complex.acoth();
    expect(result.im).toBeLessThan(0);
  });
});