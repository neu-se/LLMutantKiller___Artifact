import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with protocol-relative base url', () => {
  it('should correctly resolve relative url against protocol-relative base url', () => {
    const result = parse("ddd", "//www.stackoverflow.com/aaa/bbb/ccc");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.stackoverflow.com/aaa/bbb/ddd");
    expect(result!.baseurl).toBe("http://www.stackoverflow.com/aaa/bbb/ccc");
  });
});