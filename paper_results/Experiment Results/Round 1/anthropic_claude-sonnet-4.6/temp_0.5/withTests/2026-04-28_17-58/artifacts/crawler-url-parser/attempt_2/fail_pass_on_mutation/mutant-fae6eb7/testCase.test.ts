import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with baseUrl hash stripping', () => {
  it('should correctly resolve relative URL using baseUrl after stripping hash', () => {
    // baseUrl with hash - the hash and everything after should be stripped
    // Both regexes should behave the same for normal strings
    // But let's use a baseUrl where hash stripping matters for resolution
    const result = parse("ddd", "http://www.stackoverflow.com/aaa/bbb/ccc#section");
    expect(result).not.toBeNull();
    expect(result!.baseurl).toBe("http://www.stackoverflow.com/aaa/bbb/ccc");
    expect(result!.url).toBe("http://www.stackoverflow.com/aaa/bbb/ddd");
  });
});