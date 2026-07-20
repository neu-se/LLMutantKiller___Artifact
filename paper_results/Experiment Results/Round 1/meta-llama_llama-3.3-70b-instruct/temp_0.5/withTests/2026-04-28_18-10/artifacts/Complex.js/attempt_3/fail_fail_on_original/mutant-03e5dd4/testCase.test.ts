import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should handle newline characters correctly', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);

    const complexWithNewline = new Complex('1+\n2i');
    expect(complexWithNewline.re).toBeNaN();
    expect(complexWithNewline.im).toBeNaN();
  });
});