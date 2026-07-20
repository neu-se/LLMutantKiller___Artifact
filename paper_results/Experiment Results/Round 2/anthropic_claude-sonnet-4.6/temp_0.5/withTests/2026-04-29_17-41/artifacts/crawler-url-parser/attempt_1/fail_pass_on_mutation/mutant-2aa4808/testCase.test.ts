// testCase.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative url with base url containing query string', () => {
  it('should correctly resolve relative url against base url with query parameters', () => {
    const result = parse("ddd", "http://www.stackoverflow.com/aaa/bbb/ccc?q1=query1&q2=query2");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.stackoverflow.com/aaa/bbb/ddd");
  });
});