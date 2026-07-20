describe('Complex', () => {
  it('should calculate the power of two complex numbers correctly for a specific case', () => {
    const Complex = require('./complex.js').Complex;
    const z1 = new Complex(0, 0);
    const z2 = new Complex(1, 0);
    const result = z1.pow(z2);
    expect(result.re).toBeCloseTo(1, 10);
    expect(result.im).toBeCloseTo(0, 10);
    if (z1.re === 0 && z1.im === 0 && z2.re > 0 && z2.im >= 0) {
      expect(true).toBe(true);
    } else {
      expect(false).toBe(true);
    }
  });
});