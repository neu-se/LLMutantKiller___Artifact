const Complex = require('./complex.js').Complex;

describe('Complex', () => {
  it('should parse complex string with minus sign correctly', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    const complex2 = new Complex('1-2i');
    expect(complex2.re).toBe(1);
    expect(complex2.im).toBe(-2);
    const complex3 = new Complex('3-4i');
    expect(complex3.re).toBe(3);
    expect(complex3.im).toBe(-4);
  });
});