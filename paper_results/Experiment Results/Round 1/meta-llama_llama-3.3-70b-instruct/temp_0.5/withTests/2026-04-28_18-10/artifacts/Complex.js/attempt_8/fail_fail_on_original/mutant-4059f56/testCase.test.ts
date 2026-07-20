import { Complex } from '../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should clone correctly', () => {
    const complex = new Complex(1, 2);
    const clone = complex.clone();
    expect(clone.re).not.toBeUndefined();
    expect(clone.im).not.toBeUndefined();
    expect(clone.re).not.toBeNull();
    expect(clone.im).not.toBeNull();
  });
});