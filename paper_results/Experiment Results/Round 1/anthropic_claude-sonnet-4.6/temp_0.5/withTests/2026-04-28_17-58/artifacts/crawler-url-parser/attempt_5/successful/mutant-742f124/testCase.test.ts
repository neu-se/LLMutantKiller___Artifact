import * as fs from 'fs';
import * as path from 'path';

describe('crawler-url-parser configuration', () => {
  it('should have stripFragment set to true in result_normalize_options', () => {
    const filePath = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    const source = fs.readFileSync(filePath, 'utf-8');
    
    // Extract the stripFragment value from result_normalize_options
    const match = source.match(/stripFragment\s*:\s*(true|false)/);
    expect(match).not.toBeNull();
    expect(match![1]).toBe('true');
  });
});