import { Complex } from '../../../complex.js';

describe('Complex.js', () => {
  it('should handle whitespace characters correctly', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);

    const complexWithSpace = new Complex('1 + 2i');
    expect(complexWithSpace.re).toBe(1);
    expect(complexWithSpace.im).toBe(2);
  });
});