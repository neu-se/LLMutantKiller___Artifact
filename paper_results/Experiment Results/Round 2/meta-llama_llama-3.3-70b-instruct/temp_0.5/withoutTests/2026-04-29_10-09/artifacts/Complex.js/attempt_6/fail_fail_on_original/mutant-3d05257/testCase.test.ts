try {
  const Complex = require('./complex.js').Complex;

  describe('Complex', () => {
    it('should calculate the complex acosh correctly', () => {
      const complex = new Complex(2, 0);
      const acosh = complex.acosh();
      expect(acosh.re).toBeCloseTo(1.316, 3);
      expect(acosh.im).toBeCloseTo(0, 3);
    });
  });
} catch (error) {
  console.error('Error requiring complex.js:', error);
}