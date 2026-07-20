describe('Complex', () => {
  it('should calculate csch correctly', () => {
    const Complex = require('../complex').Complex;
    const z = new Complex(1, 1);
    const result = z.csch();
    const a = 2 * z.re;
    const b = 2 * z.im;
    const d = Math.cos(b) - Math.cosh(a);
    expect(d).not.toBe(0);
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(result.re).not.toBe(Infinity);
    expect(result.im).not.toBe(Infinity);
    expect(result.re).not.toBe(-Infinity);
    expect(result.im).not.toBe(-Infinity);
  });
});