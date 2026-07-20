import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex.js', () => {
  it('should handle newline characters correctly', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);

    try {
      new Complex('1+\n2i');
      expect(true).toBe(false); // This line should not be reached
    } catch (error) {
      expect(error.constructor.name).toBe('SyntaxError');
    }
  });
});