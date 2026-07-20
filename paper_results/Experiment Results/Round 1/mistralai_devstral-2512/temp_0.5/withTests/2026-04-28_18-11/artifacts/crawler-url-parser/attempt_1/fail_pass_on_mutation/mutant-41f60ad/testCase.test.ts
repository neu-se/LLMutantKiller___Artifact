// test/parse-query-params.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with query parameters', () => {
  it('should correctly parse URL with query parameters when base URL is provided', () => {
    const result = parse("../ddd?q1=query1&q2=query2", "http://question.stackoverflow.com/aaa/bbb/ccc/");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://question.stackoverflow.com/aaa/bbb/ddd?q1=query1&q2=query2");
    expect(result?.search).toBe("?q1=query1&q2=query2");
    expect(result?.querycount).toBe(2);
  });
});