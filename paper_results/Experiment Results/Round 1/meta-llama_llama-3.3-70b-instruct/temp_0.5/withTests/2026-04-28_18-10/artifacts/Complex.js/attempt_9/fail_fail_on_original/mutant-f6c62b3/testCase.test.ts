const fs = require('fs');
const path = require('path');

describe('Complex.js', () => {
  it('should not have an empty string property', () => {
    const filePath = path.join(__dirname, 'complex.js');
    if (fs.existsSync(filePath)) {
      const code = fs.readFileSync(filePath, 'utf8');
      expect(code).not.toContain("Object.defineProperty(Complex, '', { 'value': true })");
    } else {
      expect(false).toBe(true);
    }
  });
});