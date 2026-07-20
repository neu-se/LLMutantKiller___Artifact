const fs = require('fs');
const path = require('path');

const complexPath = path.join(__dirname, 'complex.js');
if (fs.existsSync(complexPath)) {
  const Complex = require(complexPath).Complex;

  describe('Complex', () => {
    it('should calculate the complex acosh correctly', () => {
      const complex = new Complex(2, 0);
      const acosh = complex.acosh();
      expect(acosh.re).toBeCloseTo(1.316, 3);
      expect(acosh.im).toBeCloseTo(0, 3);
    });

    it('should not throw an error when calculating the complex acosh', () => {
      const complex = new Complex(2, 0);
      expect(() => complex.acosh()).not.toThrow();
    });
  });
} else {
  describe('Complex', () => {
    it('should fail when requiring complex.js', () => {
      expect(true).toBe(false);
    });
  });
}