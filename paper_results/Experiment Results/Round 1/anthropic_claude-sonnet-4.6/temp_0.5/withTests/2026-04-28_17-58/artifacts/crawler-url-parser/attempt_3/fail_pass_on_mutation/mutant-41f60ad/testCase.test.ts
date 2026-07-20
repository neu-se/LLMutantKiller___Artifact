import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative URL with base URL and query string', () => {
  it('should correctly parse relative URL with query parameters using base URL', () => {
    const result = parse("ddd?q1=val1&q2=val2", "http://www.stackoverflow.com/aaa/bbb/ccc/");
    expect(result).not.toBeNull();
    expect(result.search).toBe("?q1=val1&q2=val2");
    expect(result.querycount).toBe(2);
    expect(result.url).toBe("http://www.stackoverflow.com/aaa/bbb/ccc/ddd?q1=val1&q2=val2");
  });
});