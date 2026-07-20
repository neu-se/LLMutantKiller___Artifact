const fs = require('fs');
const path = require('path');

describe('Complex.js', () => {
  it('should have the __esModule property defined', () => {
    const filePath = path.join(__dirname, 'complex.js');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    expect(fileContent).toContain('Object.defineProperty(Complex, "__esModule", { "value": true });');
  });
});