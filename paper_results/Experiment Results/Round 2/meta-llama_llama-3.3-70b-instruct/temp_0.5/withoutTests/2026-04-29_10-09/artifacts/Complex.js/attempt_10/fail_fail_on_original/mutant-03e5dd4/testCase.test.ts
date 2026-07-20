import { Complex } from '../../../subject_repositories/Complex.js/complex.js';

describe('Complex.js', () => {
  it('should parse complex numbers correctly', () => {
    const complex = new Complex('3+4i');
    expect(complex.re).toBe(3);
    expect(complex.im).toBe(4);

    // Test with a string containing a newline character
    expect(() => new Complex('3\n+4i')).toThrowError(SyntaxError);
  });
});