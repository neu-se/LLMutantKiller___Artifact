import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative URL with query string against base URL', () => {
  it('should correctly resolve relative URL with query params against base URL', () => {
    const result = parse("ddd?q=test", "http://www.stackoverflow.com/aaa/bbb/ccc");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://www.stackoverflow.com/aaa/bbb/ddd?q=test");
    expect(result.search).toBe("?q=test");
    expect(result.querycount).toBe(1);
  });
});