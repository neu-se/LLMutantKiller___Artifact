const fs = require('fs');
const path = require('path');

const complexCode = fs.readFileSync(path.join(__dirname, 'complex.js'), 'utf8');

describe('Complex', () => {
  it('should have a default property', () => {
    expect(complexCode).toContain('Complex["default"] = Complex;');
  });
});