import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative URL with base URL containing query string', () => {
  it('should correctly parse querycount for resolved relative URL with query params', () => {
    const result = parse("../ddd?q1=query1&q2=query2", "http://www.stackoverflow.com/aaa/bbb/ccc/");
    expect(result).not.toBeNull();
    expect(result.querycount).toBe(2);
    expect(result.search).toBe("?q1=query1&q2=query2");
    expect(result.url).toBe("http://www.stackoverflow.com/aaa/bbb/ddd?q1=query1&q2=query2");
  });
});