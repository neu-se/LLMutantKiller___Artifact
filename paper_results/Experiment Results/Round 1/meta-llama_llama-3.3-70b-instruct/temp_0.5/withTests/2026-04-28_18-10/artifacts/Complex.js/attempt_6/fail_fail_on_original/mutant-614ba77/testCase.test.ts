const fs = require('fs');

describe('Complex', () => {
  it('should not have an empty string key', () => {
    const fileContent = fs.readFileSync('./complex.js', 'utf8');
    expect(fileContent).not.toContain("Complex[\"\"] = Complex;");
  });
});