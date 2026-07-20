const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'complex.js');
const complexCode = fs.readFileSync(filePath, 'utf8');

describe('Complex', () => {
  it('should have a property with its own name', () => {
    expect(complexCode).toContain('Complex["Complex"] = Complex;');
    expect(complexCode).not.toContain('Complex[""] = Complex;');
  });
});