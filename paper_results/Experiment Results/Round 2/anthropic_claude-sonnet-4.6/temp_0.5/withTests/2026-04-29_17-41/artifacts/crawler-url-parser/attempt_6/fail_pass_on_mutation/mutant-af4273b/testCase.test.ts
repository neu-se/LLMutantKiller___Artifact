import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse empty string relative url with base url having query params', () => {
  it('should resolve empty relative url against base with query params', () => {
    const result = parse("", "http://www.stackoverflow.com/aaa/bbb?q=1");
    // empty string href is filtered out in extract, but parse directly...
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.stackoverflow.com/aaa/bbb?q=1");
  });
});