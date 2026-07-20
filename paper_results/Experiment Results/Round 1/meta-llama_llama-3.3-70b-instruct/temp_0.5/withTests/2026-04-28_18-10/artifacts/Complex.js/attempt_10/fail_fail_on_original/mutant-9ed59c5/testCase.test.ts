const fs = require('fs');

describe('Complex.js', () => {
  it('should contain the define function call', () => {
    const filePath = __dirname + '/complex.js';
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      expect(content).toContain('if (typeof define === \'function\' && define[\'amd\']) {');
    } else {
      throw new Error(`File ${filePath} not found`);
    }
  });
});