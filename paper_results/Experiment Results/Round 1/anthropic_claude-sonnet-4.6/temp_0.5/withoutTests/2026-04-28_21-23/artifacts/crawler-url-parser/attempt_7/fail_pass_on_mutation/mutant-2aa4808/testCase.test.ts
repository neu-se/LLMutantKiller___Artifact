import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should correctly parse URL with query parameters in base URL when resolving relative URL', () => {
    const result = parse('page', 'http://example.com/dir/?a=1&b=2&c=3');
    expect(result).not.toBeNull();
    expect(result?.querycount).toBe(0);
    expect(result?.search).toBeNull();
    expect(result?.url).toBe('http://example.com/dir/page');
  });
});