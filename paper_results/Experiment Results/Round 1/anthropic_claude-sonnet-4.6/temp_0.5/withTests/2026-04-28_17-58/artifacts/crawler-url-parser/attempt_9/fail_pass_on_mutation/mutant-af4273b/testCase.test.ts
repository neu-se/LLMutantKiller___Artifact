import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative path URL against base URL with query string', () => {
  it('should not carry over base query string to resolved relative URL', () => {
    const result = parse("ddd", "http://www.stackoverflow.com/aaa/bbb/?q=1");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.stackoverflow.com/aaa/bbb/ddd");
  });
});