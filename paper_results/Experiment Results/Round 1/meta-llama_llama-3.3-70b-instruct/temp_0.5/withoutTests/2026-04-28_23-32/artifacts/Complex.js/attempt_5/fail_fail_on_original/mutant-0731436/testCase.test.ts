import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should return the correct result for asec', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asec();
    expect(result.toString()).toContain('0');
  });
});