const Complex = require('../complex.js').Complex;

describe('Complex', () => {
  it('should parse complex numbers correctly', () => {
    const complexWithNewline = new Complex('1+ 2i');
    expect(complexWithNewline.re).toBe(1);
    expect(complexWithNewline.im).toBe(2);
    const complexWithTab = new Complex('1+\t2i');
    expect(complexWithTab.re).toBe(1);
    expect(complexWithTab.im).toBe(2);
    const complexWithSpace = new Complex('1+ 2i');
    expect(complexWithSpace.re).toBe(1);
    expect(complexWithSpace.im).toBe(2);
  });
});