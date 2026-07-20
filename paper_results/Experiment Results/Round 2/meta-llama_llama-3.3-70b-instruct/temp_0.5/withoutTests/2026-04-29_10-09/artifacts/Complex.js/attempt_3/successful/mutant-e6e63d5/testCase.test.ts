import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate the complex arcus cosecans', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result).not.toBeUndefined();
  });
});