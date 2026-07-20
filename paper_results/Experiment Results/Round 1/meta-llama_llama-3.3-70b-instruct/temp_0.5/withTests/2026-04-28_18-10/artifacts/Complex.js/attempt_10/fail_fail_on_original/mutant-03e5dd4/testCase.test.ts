const Complex = require('./complex').Complex;

describe('Complex.js', () => {
  it('should handle whitespace characters correctly', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);

    const complexWithSpace = new Complex('1 + 2i');
    expect(complexWithSpace.re).toBe(1);
    expect(complexWithSpace.im).toBe(2);

    const complexWithNewline = new Complex('1+\n2i');
    expect(complexWithNewline.re).toBeNaN();
    expect(complexWithNewline.im).toBeNaN();
  });
});