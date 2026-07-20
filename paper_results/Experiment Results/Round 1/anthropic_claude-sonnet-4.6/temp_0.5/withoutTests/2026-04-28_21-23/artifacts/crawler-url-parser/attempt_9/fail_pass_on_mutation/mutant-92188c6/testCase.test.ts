import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should correctly parse absolute URL with query string', () => {
    const result = parse('http://example.com/path?a=1&b=2');
    expect(result).not.toBeNull();
    expect(result!.querycount).toBe(2);
    expect(result!.url).toBe('http://example.com/path?a=1&b=2');
  });
});