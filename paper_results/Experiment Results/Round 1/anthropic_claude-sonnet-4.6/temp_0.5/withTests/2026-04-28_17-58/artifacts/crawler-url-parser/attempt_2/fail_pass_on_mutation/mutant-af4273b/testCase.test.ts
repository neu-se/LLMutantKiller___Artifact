import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with base URL containing special query characters', () => {
  it('should preserve query string encoding in baseurl when base URL has encoded characters', () => {
    const result = parse("ddd", "http://www.stackoverflow.com/aaa/bbb?q=hello+world");
    expect(result).not.toBeNull();
    expect(result.baseurl).toBe("http://www.stackoverflow.com/aaa/bbb?q=hello+world");
  });
});