const Complex = require('../../../../complex.js').Complex;

describe('Complex.js', () => {
  it('should correctly parse complex numbers from strings', () => {
    const complexNumber = new Complex('1+2i');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(2);
    const c = new Complex('2');
    expect(c.re).toBe(2);
    expect(c.im).toBe(0);
    const d = new Complex('1');
    expect(d.toString()).toBe('1');
    const e = new Complex('1+2i');
    expect(e.toString()).toBe('1 + 2i');
    expect(new Complex('1+2i').re).toBe(1);
    expect(new Complex('1+2i').im).toBe(2);
    const f = new Complex('3');
    expect(f.re).toBe(3);
    expect(f.im).toBe(0);
  });
});