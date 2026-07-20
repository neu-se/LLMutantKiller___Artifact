import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should handle query-only current URL with base URL', () => {
    const result = parse('?key=value', 'http://example.com/path/page.html');
    expect(result).not.toBeNull();
    expect(result?.search).toBe('?key=value');
    expect(result?.querycount).toBe(1);
    expect(result?.path).toBe('/path/page.html');
  });
});