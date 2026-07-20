import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative URL with no query against base URL with query', () => {
  it('should not inherit base URL query string when resolving relative URL with no query', () => {
    // relative URL "ddd" has no query string
    // base URL has query string ?q=1
    // URL.resolveObject: relative has no search, so it might use base's query (object) vs search (string)
    const result = parse("ddd", "http://www.stackoverflow.com/aaa/bbb?q=1");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.stackoverflow.com/aaa/ddd");
  });
});