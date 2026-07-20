import * as fs from 'fs';
import * as path from 'path';

describe('result_normalize_options configuration', () => {
  it('should have stripWWW set to true in the normalize options', () => {
    const filePath = path.resolve(
      __dirname,
      '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js'
    );
    const source = fs.readFileSync(filePath, 'utf8');
    // Extract the stripWWW value from the options object
    const match = source.match(/stripWWW\s*:\s*(true|false)/);
    expect(match).not.toBeNull();
    expect(match![1]).toBe('true');
  });
});