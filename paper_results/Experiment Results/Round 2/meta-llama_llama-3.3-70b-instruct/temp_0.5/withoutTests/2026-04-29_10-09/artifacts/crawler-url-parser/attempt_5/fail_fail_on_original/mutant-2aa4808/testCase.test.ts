import { parse } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly parse a relative URL when given a base URL', () => {
    const baseUrlStr = 'http://example.com/path/to/base';
    const currentUrlStr = 'relative/url';
    const result = parse(currentUrlStr, baseUrlStr);
    expect(result).not.toBeNull();
    expect(result.url).toBe('http://example.com/path/to/base/relative/url');
    const parsedBaseUrl = new URL(baseUrlStr);
    const parsedCurrentUrl = new URL(result.url);
    expect(parsedCurrentUrl.search).toBe('');
  });
});