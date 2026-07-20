const Complex = require('./complex').Complex;

describe('Complex', () => {
  it('should parse complex string with minus sign correctly', () => {
    const complex = new Complex('3-4i');
    expect(complex.re).toBe(3);
    expect(complex.im).toBe(-4);
    const complex2 = new Complex('1+2i');
    expect(complex2.re).toBe(1);
    expect(complex2.im).toBe(2);
  });
});