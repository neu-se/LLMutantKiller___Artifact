const Complex = require('./complex.js').Complex;

describe('Complex', () => {
  it('should parse complex string with minus sign correctly', () => {
    const complex1 = new Complex('3+4i');
    const complex2 = new Complex('3-4i');
    expect(complex1.re).toBe(3);
    expect(complex1.im).toBe(4);
    expect(complex2.re).toBe(3);
    expect(complex2.im).toBe(-4);
  });
});