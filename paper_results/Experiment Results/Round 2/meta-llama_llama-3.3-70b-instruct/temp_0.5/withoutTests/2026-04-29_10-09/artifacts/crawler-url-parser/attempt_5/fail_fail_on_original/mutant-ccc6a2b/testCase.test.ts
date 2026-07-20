const fs = require('fs');
const path = require('path');

describe('crawler-url-parser.js', () => {
  it('should have a non-empty if (!module.parent) block', () => {
    const filePath = path.join(__dirname, './crawler-url-parser.js');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    expect(fileContent).toContain('if (!module.parent)');
    expect(fileContent).not.toContain('if (!module.parent) {}');
  });
});