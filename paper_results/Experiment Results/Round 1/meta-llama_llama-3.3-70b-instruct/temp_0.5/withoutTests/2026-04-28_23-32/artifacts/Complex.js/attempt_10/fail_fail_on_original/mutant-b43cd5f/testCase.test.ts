const Complex = require('./complex.js').Complex;

describe('Complex', () => {
  it('should parse complex numbers with newlines incorrectly', () => {
    const complexWithNewline = new Complex('1+\n2i');
    expect(complexWithNewline.re).not.toBe(1);
    expect(complexWithNewline.im).not.toBe(2);
  });
});