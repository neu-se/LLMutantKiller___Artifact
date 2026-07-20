import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative URL resolution with query string handling', () => {
  it('should correctly resolve relative URL without inheriting base query string', () => {
    // When resolving a relative URL (no query) against a base with query string
    // Original (parseQueryString=true): query={} object -> clears base query in resolution
    // Mutant (parseQueryString=false): query=null -> may inherit base query
    const result = parse("ddd", "http://www.example.com/aaa/?base=1");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.example.com/aaa/ddd");
  });
});