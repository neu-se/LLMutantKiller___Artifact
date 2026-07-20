import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should have a function asec that is not empty', () => {
    const c = new Complex(1, 1);
    expect(c.asec.toString()).not.toBe('function asec() {}');
  });
});