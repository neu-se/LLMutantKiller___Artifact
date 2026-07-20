import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse relative url with base url', () => {
  it('should correctly parse relative url with query against base url with query', () => {
    const result = parse("ddd?x=2", "http://www.stackoverflow.com/aaa/bbb?q=1");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.stackoverflow.com/aaa/ddd?x=2");
    expect(result!.baseurl).toBe("http://www.stackoverflow.com/aaa/bbb?q=1");
    expect(result!.search).toBe("?x=2");
    expect(result!.querycount).toBe(1);
  });
});