const fs = require('fs');
const path = require('path');

const complexPath = path.join(__dirname, 'complex.js');
const complexCode = fs.readFileSync(complexPath, 'utf8');

describe('Complex', () => {
  it('should not have an empty string key', () => {
    const lines = complexCode.split('\n');
    let hasDefaultExport = false;
    lines.forEach((line) => {
      if (line.includes('Complex["default"] = Complex;')) {
        hasDefaultExport = true;
      }
    });
    expect(hasDefaultExport).toBe(true);
  });
});