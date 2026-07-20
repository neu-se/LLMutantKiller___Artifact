import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with baseUrl and search parameters', function () {
  it('should parse correctly', function () {
    const currentUrlStr = "../ddd?a=1&b=2";
    const baseUrlStr = "http://www.stackoverflow.com/aaa/bbb/ccc?c=3&d=4";
    const resultOriginal = parse(currentUrlStr, baseUrlStr);
    const resultMutated = parse(currentUrlStr, baseUrlStr);
    expect(resultOriginal.search).not.toBe(resultMutated.search);
  });
});