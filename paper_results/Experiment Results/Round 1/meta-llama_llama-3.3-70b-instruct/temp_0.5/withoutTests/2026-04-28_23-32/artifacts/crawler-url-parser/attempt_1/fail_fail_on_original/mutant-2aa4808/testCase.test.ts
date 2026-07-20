import { parse } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly parse relative URLs', () => {
    const baseUrlStr = 'http://example.com/path/to/base';
    const currentUrlStr = '../relative/url';
    const result = parse(currentUrlStr, baseUrlStr);
    expect(result.url).toBe('http://example.com/path/relative/url');
  });
});