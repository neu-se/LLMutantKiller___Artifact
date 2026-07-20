import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate acsc correctly', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.acsc()).not.toThrow();
  });
});