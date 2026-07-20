import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative URL resolution with base URL having query string', () => {
  it('should not inherit base query string when resolving a relative path', () => {
    // Original (parseQueryString=true): base.search=null, so resolved URL has no query
    // Mutated (parseQueryString=false): base.search='?q=1', so resolved URL inherits query
    const result = parse("/ddd", "http://www.stackoverflow.com/aaa/bbb?q=1");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.stackoverflow.com/ddd");
  });
});