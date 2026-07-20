import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with baseUrl containing only a fragment', () => {
  it('should return correct baseurl field when baseUrl has fragment', () => {
    const result = parse("ddd", "http://www.stackoverflow.com/aaa/bbb/ccc#section");
    expect(result).not.toBeNull();
    expect(result!.baseurl).toBe("http://www.stackoverflow.com/aaa/bbb/ccc");
  });
});