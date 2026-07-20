import * as fs from 'fs';
import * as path from 'path';

describe('result_normalize_options normalizeHttps value', () => {
  it('should have normalizeHttps set to false in the source code', () => {
    // Find the crawler-url-parser.js file relative to this test
    const filePath = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    const source = fs.readFileSync(filePath, 'utf8');
    
    // Extract the normalizeHttps value from the source
    const match = source.match(/normalizeHttps\s*:\s*(true|false)/);
    expect(match).not.toBeNull();
    expect(match![1]).toBe('false');
  });
});