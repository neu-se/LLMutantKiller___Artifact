import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should have a default export', () => {
    expect(Object.keys(Complex).includes('default')).toBe(true);
  });
});