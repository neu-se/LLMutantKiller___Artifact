import * as fs from 'fs';
import * as path from 'path';

describe('removeQueryParameters regex anchor', () => {
  it('should use anchored regex /^utm_\\w+/i that only matches strings starting with utm_', () => {
    // Read the source file to verify the regex pattern
    const sourceCode = fs.readFileSync(
      path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js'),
      'utf-8'
    );
    
    // Extract the removeQueryParameters regex from the source
    const match = sourceCode.match(/removeQueryParameters:\s*\[([^\]]+)\]/);
    expect(match).not.toBeNull();
    
    const regexStr = match![1];
    // Original has ^ anchor: /^utm_\w+/i
    // Mutated does not: /utm_\w+/i
    expect(regexStr).toContain('^utm_');
  });
});