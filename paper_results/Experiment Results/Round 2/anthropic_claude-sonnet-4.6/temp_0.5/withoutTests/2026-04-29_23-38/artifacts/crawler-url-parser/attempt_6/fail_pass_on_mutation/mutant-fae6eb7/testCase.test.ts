import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should correctly parse URL when baseUrl has fragment', () => {
    // Try various fragment patterns
    const cases = [
      ['page', 'http://example.com/#frag', 'http://example.com/page'],
      ['/page', 'http://example.com/dir#frag', 'http://example.com/page'],
      ['../page', 'http://example.com/dir/sub#frag', 'http://example.com/page'],
    ];
    
    for (const [current, base, expected] of cases) {
      const result = parse(current, base);
      expect(result?.url).toBe(expected);
    }
  });
});