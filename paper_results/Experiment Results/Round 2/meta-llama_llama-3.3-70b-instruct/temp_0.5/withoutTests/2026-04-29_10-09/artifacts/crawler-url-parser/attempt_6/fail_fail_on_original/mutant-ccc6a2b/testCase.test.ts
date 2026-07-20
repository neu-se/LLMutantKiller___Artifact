const fs = require('fs');
const path = require('path');

describe('crawler-url-parser.js', () => {
  it('should have a non-empty if (!module.parent) block', () => {
    const filePath = path.join(process.cwd(), 'crawler-url-parser.js');
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      expect(fileContent).toContain('if (!module.parent)');
      expect(fileContent).not.toContain('if (!module.parent) {}');
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error('crawler-url-parser.js file not found');
      } else {
        throw error;
      }
    }
  });
});