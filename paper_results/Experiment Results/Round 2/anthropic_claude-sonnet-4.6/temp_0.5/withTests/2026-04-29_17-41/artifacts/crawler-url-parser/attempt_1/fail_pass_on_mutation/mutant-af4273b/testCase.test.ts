import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative url with base url having query string', () => {
  it('should correctly parse relative url against base url with query string', () => {
    const result = parse("ddd", "http://www.stackoverflow.com/aaa/bbb/ccc?q=hello%20world");
    expect(result).not.toBeNull();
    expect(result!.baseurl).toBe("http://www.stackoverflow.com/aaa/bbb/ccc?q=hello%20world");
  });
});