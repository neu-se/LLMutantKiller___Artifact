import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative url with base url containing query parameters', () => {
  it('should preserve query count when resolving relative url against base url with query string', () => {
    const result = parse("../ddd?q1=val1&q2=val2", "http://www.stackoverflow.com/aaa/bbb/ccc/");
    expect(result).not.toBeNull();
    expect(result!.querycount).toBe(2);
    expect(result!.search).toBe("?q1=val1&q2=val2");
    expect(result!.url).toBe("http://www.stackoverflow.com/aaa/bbb/ddd?q1=val1&q2=val2");
  });
});