import * as fs from 'fs';
import * as path from 'path';

describe('result_normalize_options definition', () => {
  it('should define result_normalize_options with specific normalization properties', () => {
    const filePath = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    const source = fs.readFileSync(filePath, 'utf-8');
    expect(source).toContain('removeDirectoryIndex: true');
    expect(source).toContain('removeTrailingSlash: true');
    expect(source).toContain('stripWWW: true');
  });
});