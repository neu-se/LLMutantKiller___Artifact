import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should not be undefined when calling asec on a Complex instance', () => {
    const c = new Complex(1, 1);
    const result = c.asec;
    expect(result).toBeDefined();
  });
});