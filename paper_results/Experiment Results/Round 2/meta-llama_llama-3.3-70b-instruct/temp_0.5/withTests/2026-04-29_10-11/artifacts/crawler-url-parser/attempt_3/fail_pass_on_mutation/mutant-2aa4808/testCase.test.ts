import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with baseUrl and hash', function () {
  it('should parse correctly', function () {
    const currentUrlStr = "../ddd#anchor";
    const baseUrlStr = "http://www.stackoverflow.com/aaa/bbb/ccc";
    const result = parse(currentUrlStr, baseUrlStr);
    expect(result.url).toBe("http://www.stackoverflow.com/aaa/ddd");
  });
});