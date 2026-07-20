const fs = require('fs');
const path = require('path');

describe('Complex', () => {
  it('should export Complex as a module', () => {
    const complexPath = path.join(__dirname, './complex.js');
    expect(fs.existsSync(complexPath)).toBe(true);
    const Complex = require(complexPath);
    expect(typeof Complex).toBe('function');
  });
});