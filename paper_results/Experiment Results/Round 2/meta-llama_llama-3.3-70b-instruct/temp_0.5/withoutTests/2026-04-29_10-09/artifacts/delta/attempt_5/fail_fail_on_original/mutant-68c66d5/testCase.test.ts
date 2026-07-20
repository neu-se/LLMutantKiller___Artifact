const fs = require('fs');
const path = require('path');

describe('Delta', () => {
  it('should export Delta as default and named export', () => {
    const filePath = path.join(__dirname, '../src/Delta.ts');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    expect(fileContent).toContain('module.exports = Delta;');
    expect(fileContent).toContain('module.exports.default = Delta;');
  });
});