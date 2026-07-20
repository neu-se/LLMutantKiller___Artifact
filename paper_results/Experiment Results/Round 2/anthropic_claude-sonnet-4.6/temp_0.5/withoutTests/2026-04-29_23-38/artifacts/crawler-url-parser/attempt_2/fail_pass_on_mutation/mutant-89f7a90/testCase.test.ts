import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function with baseUrl containing fragment', () => {
  it('should produce a valid URL when baseUrl has a fragment identifier', () => {
    const result = parse('page.html', 'http://example.com/path/#section');
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/path/page.html');
  });
});