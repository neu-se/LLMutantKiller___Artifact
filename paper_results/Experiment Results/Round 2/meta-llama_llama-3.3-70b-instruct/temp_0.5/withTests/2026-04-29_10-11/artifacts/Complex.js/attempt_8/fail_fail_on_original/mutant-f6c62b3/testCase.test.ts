const fs = require('fs');
const path = require('path');

describe('Complex.js', () => {
  it('should have the __esModule property defined', () => {
    const filePath = path.join(__dirname, '../../complex.js');
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      expect(fileContent).toContain('Object.defineProperty(Complex, "__esModule", { "value": true });');
    } catch (error) {
      throw new Error(`Error reading file: ${error}`);
    }
  });
});