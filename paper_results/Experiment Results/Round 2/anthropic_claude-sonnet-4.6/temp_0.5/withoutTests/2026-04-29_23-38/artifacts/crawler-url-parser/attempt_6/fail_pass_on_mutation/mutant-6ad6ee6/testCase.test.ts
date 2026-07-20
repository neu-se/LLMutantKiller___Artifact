import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function - fragment removal', () => {
  it('should correctly parse URL where leftover fragment char becomes part of query string', () => {
    // After mutant partial removal of "#a", "=b" remains appended to search
    // "http://example.com/path?q=1#a=b" -> mutant -> "http://example.com/path?q=1=b"
    // URL.parse sees no hash in "http://example.com/path?q=1=b", search = "?q=1=b"
    // split("=").length - 1 = 2
    // But URL.parse with hash: "http://example.com/path?q=1#a=b" -> hash="a=b", search="?q=1"
    // delete hash -> search stays "?q=1" -> querycount=1
    // The key: on original, regex removes "#a=b" first, then URL.parse sees "?q=1"
    // On mutant, regex removes "#a" leaving "=b", URL.parse sees "?q=1=b" (no hash!)
    const result = parse('http://example.com/path?q=1#a=b');
    expect(result).not.toBeNull();
    expect(result!.querycount).toBe(1);
    expect(result!.search).toBe('?q=1');
  });
});