import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should preserve query string when resolving relative URL against base URL', () => {
    // relative URL with query params resolved against base
    const result = parse('/search?q=hello&page=2', 'http://example.com/');
    expect(result).not.toBeNull();
    expect(result!.querycount).toBe(2);
  });
});