import { parse, extract, gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('crawler-url-parser basic functionality', () => {
  it('should parse a simple URL correctly', () => {
    const result = parse('http://www.example.com/path/to/page');
    expect(result).not.toBeNull();
    expect(result.url).toBe('http://www.example.com/path/to/page');
    expect(result.host).toBe('www.example.com');
    expect(result.domain).toBe('example.com');
    expect(result.subdomain).toBe('www');
    expect(result.protocol).toBe('http:');
    expect(result.path).toBe('/path/to/page');
  });
});