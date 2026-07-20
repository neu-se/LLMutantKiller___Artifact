describe('Complex', () => {
  it('should multiply two complex numbers correctly when both are real', () => {
    const Complex = require('../complex.js').Complex;
    const c1 = new Complex(2, 0);
    const c2 = new Complex(3, 0);
    const result = c1.mul(c2);
    expect(result.re).toBeCloseTo(6);
    expect(result.im).toBeCloseTo(0);
    expect(c1.mul(c2).re).not.toBeNaN();
  });
});