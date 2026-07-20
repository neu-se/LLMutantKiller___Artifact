describe('Complex', () => {
  it('should calculate the power of two complex numbers correctly for a specific case', () => {
    const Complex = require('../complex').Complex;
    const z1 = new Complex(0, 0);
    const z2 = new Complex(1, 0);
    if (z1.re === 0 && z1.im === 0 && z2.re > 0 && z2.im >= 0) {
      expect(z1.pow(z2).re).toBeCloseTo(1, 10);
      expect(z1.pow(z2).im).toBeCloseTo(0, 10);
    } else {
      expect(z1.pow(z2).re).not.toBeCloseTo(1, 10);
      expect(z1.pow(z2).im).not.toBeCloseTo(0, 10);
    }
  });
});