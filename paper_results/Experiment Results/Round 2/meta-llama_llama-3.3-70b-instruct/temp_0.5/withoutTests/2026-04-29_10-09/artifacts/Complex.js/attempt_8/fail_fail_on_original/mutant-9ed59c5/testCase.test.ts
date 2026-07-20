const fs = require('fs');
const path = require('path');

describe('Complex', () => {
  it('should have a define statement for AMD', () => {
    const filePath = path.join(__dirname, '../complex.js');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    expect(fileContent).toContain('if (typeof define === "function" && define["amd"])');
    expect(fileContent).toContain('define([], function() {');
  });
});