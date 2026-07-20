import { parse } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly parse a URL with a base URL and not include a fragment', () => {
    const baseUrlStr = 'http://example.com/path#fragment';
    const result = parse('http://example.com/path', baseUrlStr);
    expect(result).not.toBeNull();
    expect(result.baseurl).toBe('http://example.com/path');
    expect(result.url).toBe('http://example.com/path');
    expect(result.baseurl).not.toContain('Stryker was here!');
  });
});