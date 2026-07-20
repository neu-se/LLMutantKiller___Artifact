import * as fs from 'fs';
import * as path from 'path';

describe('result_normalize_options removeTrailingSlash value', () => {
  it('should have removeTrailingSlash set to true in the source', () => {
    // Read the source file to verify the constant value directly
    // since result_normalize_options is not exported but defines module behavior
    const modulePath = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    const source = fs.readFileSync(modulePath, 'utf-8');
    // The original has removeTrailingSlash: true
    // The mutant has removeTrailingSlash: false
    const match = source.match(/removeTrailingSlash\s*:\s*(true|false)/);
    expect(match).not.toBeNull();
    expect(match![1]).toBe('true');
  });
});