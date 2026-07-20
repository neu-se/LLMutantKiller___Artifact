import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should handle whitespace characters correctly', () => {
    const complex = new Complex('1 + 2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);

    const complexWithoutSpace = new Complex('1+2i');
    expect(complexWithoutSpace.re).toBe(1);
    expect(complexWithoutSpace.im).toBe(2);
  });
});