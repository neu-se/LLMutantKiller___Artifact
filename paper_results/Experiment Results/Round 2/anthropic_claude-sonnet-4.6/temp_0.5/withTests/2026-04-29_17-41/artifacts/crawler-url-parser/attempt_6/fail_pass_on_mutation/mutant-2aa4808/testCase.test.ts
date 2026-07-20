import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative url with base url', () => {
  it('should correctly resolve path-relative url against base url with trailing slash', () => {
    const result = parse("ddd", "http://www.stackoverflow.com/aaa/bbb/ccc/");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.stackoverflow.com/aaa/bbb/ccc/ddd");
    expect(result!.baseurl).toBe("http://www.stackoverflow.com/aaa/bbb/ccc/");
    expect(result!.host).toBe("www.stackoverflow.com");
    expect(result!.path).toBe("/aaa/bbb/ccc/ddd");
    expect(result!.protocol).toBe("http:");
    expect(result!.querycount).toBe(0);
  });
});