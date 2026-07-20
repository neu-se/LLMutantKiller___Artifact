describe('Complex', () => {
  it('should calculate atan correctly for a = 0 and b = 1', () => {
    const Complex = require('./complex').Complex;
    const complex = new Complex(0, 1);
    const result = complex.atan();
    if (complex.re === 0 && complex.im === 1) {
      expect(result.re).toBeCloseTo(0);
      expect(result.im).toBeCloseTo(Infinity);
    } else {
      expect(result.re).toBeCloseTo(Math.PI / 2);
      expect(result.im).toBeCloseTo(0);
    }
  });
});