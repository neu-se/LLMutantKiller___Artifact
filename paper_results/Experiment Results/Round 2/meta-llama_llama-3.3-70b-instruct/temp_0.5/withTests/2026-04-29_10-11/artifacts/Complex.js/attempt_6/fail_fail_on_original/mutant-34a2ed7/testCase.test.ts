describe('Complex.js', () => {
  it('should correctly parse complex numbers from strings', () => {
    const Complex = require('./complex.js').Complex;
    const complexNumber = new Complex('1+2i');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(2);
    const str = new Complex('1').toString();
    expect(str).not.toBe('NaN');
    expect(new Complex('1+2i').re).toBe(1);
    expect(new Complex('1+2i').im).toBe(2);
    const c = new Complex('2');
    expect(c.re).toBe(2);
    expect(c.im).toBe(0);
  });
});