import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with baseUrl and search parameters', function () {
  it('should parse correctly', function () {
    const currentUrlStr = "../ddd";
    const baseUrlStr = "http://www.stackoverflow.com/aaa/bbb/ccc?c=3&d=4#hash";
    const result = parse(currentUrlStr, baseUrlStr);
    expect(result.search).toBe("");
  });
});