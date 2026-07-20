import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should have a property with its own name', () => {
    const keys = Object.keys(Complex);
    expect(keys).toContain('Complex');
  });
});