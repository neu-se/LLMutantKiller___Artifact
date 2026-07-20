const fs = require('fs');

describe('Complex.js', () => {
  it('should contain the define function call', () => {
    const filePath = './complex.js';
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      expect(content).toContain('define([], function() { return Complex; });');
    } else {
      throw new Error(`File ${filePath} not found`);
    }
  });
});