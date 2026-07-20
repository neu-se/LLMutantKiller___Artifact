import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse relative URL with query params and base URL', () => {
  it('should correctly parse relative URL with query string against base URL', () => {
    const result = parse('path?q1=val1&q2=val2', 'http://www.example.com/base/');
    expect(result).not.toBeNull();
    expect(result.url).toBe('http://www.example.com/base/path?q1=val1&q2=val2');
    expect(result.search).toBe('?q1=val1&q2=val2');
    expect(result.querycount).toBe(2);
  });
});