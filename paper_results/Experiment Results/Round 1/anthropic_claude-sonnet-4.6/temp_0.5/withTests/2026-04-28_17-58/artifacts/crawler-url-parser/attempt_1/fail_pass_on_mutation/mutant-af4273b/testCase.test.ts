// Jest test file containing exactly one test case
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative url with base url containing query parameters', () => {
  it('should correctly set baseurl when base URL has query parameters', () => {
    const result = parse("ddd", "http://www.stackoverflow.com/aaa/bbb?q=1&r=2");
    expect(result).not.toBeNull();
    expect(result.baseurl).toBe("http://www.stackoverflow.com/aaa/bbb?q=1&r=2");
  });
});