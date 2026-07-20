import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should have a function asec', () => {
    const c = new Complex(1, 1);
    expect(typeof c.asec).toBe('function');
  });
});