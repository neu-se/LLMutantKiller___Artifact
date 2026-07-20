import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should correctly resolve relative path without query string', () => {
    const result = parse('subpage', 'http://example.com/dir/index.html');
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/dir/subpage');
  });
});