import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with lone hash fragment', () => {
  it('should strip a lone hash with no following characters', () => {
    // "http://www.example.com/page#" 
    // Original: replace(/#.*$/, '') matches "#" (zero chars after #) -> "http://www.example.com/page"
    // Mutated: replace(/#.$/, '') requires exactly ONE char after #, so "#" alone does NOT match
    // URL.parse("http://www.example.com/page#") -> hash="" or hash="#"
    // The final URL.format after delete hash should differ
    const result = parse("http://www.example.com/page#");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://www.example.com/page");
  });
});