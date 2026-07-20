import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate acsc for zero input', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acsc()).toThrow(SyntaxError);
  });
});