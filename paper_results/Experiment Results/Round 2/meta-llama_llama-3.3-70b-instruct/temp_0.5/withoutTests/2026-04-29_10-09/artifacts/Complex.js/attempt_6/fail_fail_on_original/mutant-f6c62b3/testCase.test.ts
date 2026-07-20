const fs = require('fs');
const path = require('path');

describe('Complex', () => {
  it('should have a valid export', () => {
    const filePath = path.join(__dirname, './complex.js');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    expect(fileContent).toContain('Object.defineProperty(Complex, "__esModule", { "value": true });');
  });
});