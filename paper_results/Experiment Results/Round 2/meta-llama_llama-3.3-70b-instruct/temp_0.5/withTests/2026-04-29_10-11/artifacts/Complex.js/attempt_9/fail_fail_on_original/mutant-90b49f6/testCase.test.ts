const Complex = require('../complex').Complex;

describe('Complex', () => {
  it('should parse complex string with minus sign correctly', () => {
    const complex1 = new Complex('1+2i');
    expect(complex1.re).toBe(1);
    expect(complex1.im).toBe(2);
    const complex2 = new Complex('3-4i');
    expect(complex2.re).toBe(3);
    expect(complex2.im).toBe(-4);
  });
});