describe('Complex', () => {
  it('should parse complex string with minus sign correctly', () => {
    const Complex = require('./complex.js').Complex;
    const complex = new Complex('3-4i');
    expect(complex.re).toBe(3);
    expect(complex.im).toBe(-4);
  });
});