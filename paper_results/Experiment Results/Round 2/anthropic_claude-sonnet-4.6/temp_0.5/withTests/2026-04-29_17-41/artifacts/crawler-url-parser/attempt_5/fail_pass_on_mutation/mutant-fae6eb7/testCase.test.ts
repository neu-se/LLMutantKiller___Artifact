import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with baseUrl containing fragment', () => {
  it('should resolve relative URL when baseUrl has fragment with content after hash', () => {
    const result = parse("ddd", "http://www.stackoverflow.com/aaa/bbb/ccc#section-heading");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.stackoverflow.com/aaa/bbb/ddd");
  });
});