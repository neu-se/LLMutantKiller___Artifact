import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acsch for b === 0', () => {
    const complex = new Complex(0, 0);
    expect(complex.acsch().toString()).toBe('Infinity');
  });
});