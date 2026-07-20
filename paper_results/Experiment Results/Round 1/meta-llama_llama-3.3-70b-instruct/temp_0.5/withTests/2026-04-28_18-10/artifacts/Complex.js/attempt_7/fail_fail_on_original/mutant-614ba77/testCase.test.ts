const fs = require('fs');

describe('Complex', () => {
  it('should have a default export', () => {
    const fileContent = fs.readFileSync('../complex.js', 'utf8');
    expect(fileContent).toContain("Complex['default'] = Complex;");
  });
});