import * as fs from 'fs';
import * as path from 'path';

describe('crawler-url-parser configuration', () => {
  it('should have stripWWW set to true in result_normalize_options', () => {
    const filePath = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    const content = fs.readFileSync(filePath, 'utf-8');
    const match = content.match(/stripWWW\s*:\s*(true|false)/);
    expect(match).not.toBeNull();
    expect(match![1]).toBe('true');
  });
});