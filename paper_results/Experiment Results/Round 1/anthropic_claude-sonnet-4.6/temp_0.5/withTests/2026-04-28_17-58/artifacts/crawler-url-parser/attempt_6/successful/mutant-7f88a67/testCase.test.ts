import * as fs from 'fs';
import * as path from 'path';

describe('normalizeHttps option value', () => {
  it('should have normalizeHttps set to false', () => {
    const modulePath = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    const source = fs.readFileSync(modulePath, 'utf-8');
    expect(source).toContain('normalizeHttps: false');
  });
});