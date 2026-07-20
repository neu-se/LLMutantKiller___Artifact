const fs = require('fs');
const path = require('path');

describe('Complex', () => {
  it('should have a return statement for AMD', () => {
    const filePath = path.join(__dirname, '../complex.js');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    expect(fileContent).toContain('return Complex;');
  });
});