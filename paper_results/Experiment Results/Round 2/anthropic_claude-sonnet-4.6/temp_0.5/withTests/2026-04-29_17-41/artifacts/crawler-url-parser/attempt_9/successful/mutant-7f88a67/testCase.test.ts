import * as fs from 'fs';
import * as path from 'path';

describe('result_normalize_options configuration', () => {
  it('normalizeHttps should be false in the source code', () => {
    // Read the actual source file to verify the option value
    const possiblePaths = [
      path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js'),
    ];
    
    let source = '';
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        source = fs.readFileSync(p, 'utf-8');
        break;
      }
    }
    
    expect(source).toContain('normalizeHttps: false');
    expect(source).not.toContain('normalizeHttps: true');
  });
});