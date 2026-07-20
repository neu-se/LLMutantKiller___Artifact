import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should correctly handle base URL with query parameters containing special characters', () => {
    const result = parse('/newpath', 'http://example.com/page?a=hello%20world');
    expect(result).not.toBeNull();
    expect(result!.baseurl).toBe('http://example.com/page?a=hello%20world');
    expect(result!.url).toBe('http://example.com/newpath');
  });
});