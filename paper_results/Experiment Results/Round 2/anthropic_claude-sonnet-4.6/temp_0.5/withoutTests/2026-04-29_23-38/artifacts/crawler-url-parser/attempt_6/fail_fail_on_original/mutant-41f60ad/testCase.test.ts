import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should handle plus sign encoding in query string', () => {
    const result = parse('http://example.com/?q=hello+world');
    expect(result).not.toBeNull();
    // With parseQueryString=true (original): query={q:'hello world'}, 
    // qs.stringify overwrites search -> ?q=hello%20world
    // With parseQueryString=false (mutated): search kept as-is -> ?q=hello+world
    expect(result!.url).toContain('hello%20world');
  });
});