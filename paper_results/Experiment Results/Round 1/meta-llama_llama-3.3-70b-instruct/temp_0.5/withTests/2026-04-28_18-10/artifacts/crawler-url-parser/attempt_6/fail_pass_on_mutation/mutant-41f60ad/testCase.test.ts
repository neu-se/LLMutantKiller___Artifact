import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should parse URL with query parameters and hash correctly', () => {
    const url = 'http://example.com/path?a=1&b=2#hash';
    const result = parse(url);
    expect(result.search).toContain('?a=1&b=2');
  });
});