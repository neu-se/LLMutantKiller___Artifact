const fs = require('fs');
const path = require('path');

describe('Complex', () => {
  it('should have the correct export', () => {
    const filePath = path.join(__dirname, 'complex.js');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    expect(fileContent).toContain('Object.defineProperty(Complex, "__esModule", { "value": true });');
    expect(fileContent).toContain('Complex["default"] = Complex;');
    expect(fileContent).toContain('Complex["Complex"] = Complex;');
    expect(fileContent).toContain('module["exports"] = Complex;');
  });
});