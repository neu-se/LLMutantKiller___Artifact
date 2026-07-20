describe('Complex.js', () => {
  it('should correctly parse complex numbers from strings', () => {
    const Complex = require('./complex').Complex;
    const complexNumber = new Complex('1+2i');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(2);
    const c = new Complex('2');
    expect(c.re).toBe(2);
    expect(c.im).toBe(0);
    const d = new Complex('1');
    expect(d.toString()).toBe('1');
  });
});