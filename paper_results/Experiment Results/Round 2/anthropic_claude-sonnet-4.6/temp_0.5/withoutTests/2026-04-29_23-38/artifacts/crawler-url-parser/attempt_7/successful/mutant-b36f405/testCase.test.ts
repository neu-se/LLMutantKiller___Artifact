import * as fs from 'fs';
import * as path from 'path';

describe('crawler-url-parser', () => {
  it('utm regex uses \\w', () => {
    // Try multiple possible paths
    const possiblePaths = [
      path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js'),
      // Add other possible paths
    ];
    
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        const source = fs.readFileSync(p, 'utf8');
        expect(source).toContain('/^utm_\\w+/i');
        return;
      }
    }
    
    fail('Could not find module file');
  });
});