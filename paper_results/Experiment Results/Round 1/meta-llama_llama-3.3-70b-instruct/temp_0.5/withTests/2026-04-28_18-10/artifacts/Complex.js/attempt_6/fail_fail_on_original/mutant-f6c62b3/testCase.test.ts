const fs = require('fs');
const path = require('path');

describe('Complex.js', () => {
  it('should not have an empty string property', () => {
    const complexCode = fs.readFileSync(path.join(__dirname, '../complex.js'), 'utf8');
    expect(complexCode).not.toContain("Object.defineProperty(Complex, '', { 'value': true })");
  });
});