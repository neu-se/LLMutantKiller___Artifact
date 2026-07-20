import * as fs from 'fs';
import * as path from 'path';

describe('result_normalize_options configuration', () => {
  it('should have removeDirectoryIndex set to true', () => {
    const filePath = path.resolve(
      __dirname,
      '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js'
    );
    const source = fs.readFileSync(filePath, 'utf-8');
    // Extract the value of removeDirectoryIndex from the source
    const match = source.match(/removeDirectoryIndex\s*:\s*(true|false)/);
    expect(match).not.toBeNull();
    expect(match![1]).toBe('true');
  });
});